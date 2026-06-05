const axios = require('axios')
const fs = require('fs');
const path = require('path');
require("dotenv").config();
const { Dog, Temperament } = require('../db')
const URL = 'https://api.thedogapi.com/v1/breeds?limit=90';
const URL_IMAGE = 'https://cdn2.thedogapi.com/images/';

// Configuración del cache
const CACHE_DIR = path.join(__dirname, '../../cache');
const CACHE_FILE = path.join(CACHE_DIR, 'images_cache.json');
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

// Crear carpeta cache si no existe
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

// Función para leer el cache
const readCache = () => {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const data = fs.readFileSync(CACHE_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.log('Cache corrupted or missing, will refresh');
  }
  return null;
};

// Función para guardar el cache
const writeCache = (data) => {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2), 'utf8');
    console.log('✓ Cache saved');
  } catch (error) {
    console.error('Error saving cache:', error.message);
  }
};

// Función para asegurar que el cache no esté expirado
const isCacheValid = () => {
  try {
    if (!fs.existsSync(CACHE_FILE)) return false;
    const stats = fs.statSync(CACHE_FILE);
    const age = Date.now() - stats.mtimeMs;
    return age < CACHE_DURATION;
  } catch (error) {
    return false;
  }
};

// Función para asegurar que la imagen tenga una URL válida
const formatImageUrl = (image) => {
  if (!image) {
    return "https://placedog.net/500/280";
  }
  
  // Si ya es una URL completa, devolverla
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }
  
  // Si es una ruta local, construir la URL del servidor
  return `http://localhost:3001/uploads/${image}`;
};

const dogsDBinfo = async ()=>{

    let dogsDB1 = await Dog.findAll({ 
        include: Temperament         
        });       
    console.log(dogsDB1);
    dogsDB1 = JSON.stringify(dogsDB1);
    dogsDB1 = JSON.parse(dogsDB1); 
    
   
    dogsDB1 = dogsDB1.reduce((acc, el) => acc.concat({
        ...el, 
        temperaments: el.temperaments.map(item => item.name),
        image: formatImageUrl(el.image)
    }), [])
    return dogsDB1
}

const fetchBreedImages = async (breeds) => {
  let breedImages = {};

  // Procesar en lotes paralelos para obtener imágenes específicas de cada raza
  // Máximo 15 peticiones concurrentes para evitar rate limiting
  const concurrency = 15;
  
  for (let i = 0; i < breeds.length; i += concurrency) {
    const batch = breeds.slice(i, i + concurrency);
    
    const promises = batch.map((dog) =>
      axios.get(
        `https://api.thedogapi.com/v1/images/search?breed_id=${dog.id}&limit=1`,
        {
          headers: {
            "x-api-key": process.env.DOG_API_KEY,
          },
        }
      )
        .then((res) => {
          if (res.data && res.data.length > 0 && res.data[0].url) {
            breedImages[dog.id] = res.data[0].url;
            console.log(`✓ Image loaded for ${dog.name}`);
          }
        })
        .catch((err) => {
          console.log(`⚠ No image for ${dog.name}`);
        })
    );
    
    await Promise.all(promises);
    console.log(`✓ Processed ${Math.min(i + concurrency, breeds.length)} of ${breeds.length} breeds`);
  }

  console.log(`✓ Total breeds with images: ${Object.keys(breedImages).length}`);
  return breedImages;
};

const dogsAPIinfo = async () => {
  const breedsResponse = await axios.get(URL, {
    headers: {
      "x-api-key": process.env.DOG_API_KEY,
    },
  });

  const breeds = breedsResponse.data;
  let breedImages = {};

  // Verificar si el cache es válido
  if (isCacheValid()) {
    console.log('📦 Loading images from cache...');
    const cached = readCache();
    if (cached && cached.breedImages) {
      breedImages = cached.breedImages;
      console.log('✓ Cache loaded successfully');
    }
  } else {
    console.log('🔄 Fetching images from API (cache expired or not found)...');
    breedImages = await fetchBreedImages(breeds);
    
    // Guardar en cache
    writeCache({
      breedImages,
      timestamp: Date.now(),
      breedsCount: breeds.length
    });
  }

  // Asociar imágenes con razas
  return breeds.map((dog) => {
    const imageUrl = breedImages[dog.id] || "https://placedog.net/500/280";

    return {
      id: dog.id,
      name: dog.name,
      weight: dog.weight?.metric,
      height: dog.height?.metric,
      life_span: dog.life_span,
      temperaments: dog.temperament
        ? dog.temperament.split(", ")
        : [],
      image: imageUrl,
    };
  });
};

const dogsTOTALinfo = async () => {
    const apiInfo = await dogsAPIinfo();
    const DBInfo = await dogsDBinfo();
    const infoTotal = [...DBInfo, ...apiInfo];
    return infoTotal;
};

module.exports = {
    dogsDBinfo, dogsAPIinfo, dogsTOTALinfo 
};