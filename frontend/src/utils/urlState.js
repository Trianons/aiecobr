import { useEffect, useRef } from 'react';

// Função de debounce
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Serializar biomas para URL
function serializeBiomesToURL(biomes) {
  const params = new URLSearchParams();
  
  biomes.forEach((biome, index) => {
    const prefix = `b${index}`;
    params.set(`${prefix}_name`, biome.name);
    params.set(`${prefix}_x`, biome.position.x.toFixed(4));
    params.set(`${prefix}_y`, biome.position.y.toFixed(4));
    params.set(`${prefix}_radius`, biome.regionRadius.toFixed(2));
    params.set(`${prefix}_pattern`, biome.movementPattern);
    params.set(`${prefix}_speed`, biome.movementSpeed.toFixed(4));
    params.set(`${prefix}_chaos`, biome.chaos.toFixed(2));
    params.set(`${prefix}_weight`, biome.weight.toFixed(2));
    
    if (biome.attractionForce !== undefined) {
      params.set(`${prefix}_attract`, biome.attractionForce.toFixed(2));
    }
    if (biome.repelForce !== undefined) {
      params.set(`${prefix}_repel`, biome.repelForce.toFixed(2));
    }
    if (biome.egoForce !== undefined) {
      params.set(`${prefix}_ego`, biome.egoForce.toFixed(2));
    }
    if (biome.link) {
      params.set(`${prefix}_link`, biome.link);
    }
  });
  
  return params.toString();
}

// Deserializar URL para biomas
function deserializeBiomesFromURL(defaultBiomes) {
  const params = new URLSearchParams(window.location.search);
  
  // Se não há parâmetros, retorna configuração padrão
  if (!params.has('b0_name')) {
    return defaultBiomes;
  }
  
  const biomes = [];
  let index = 0;
  
  while (params.has(`b${index}_name`)) {
    const prefix = `b${index}`;
    const defaultBiome = defaultBiomes[index] || defaultBiomes[0];
    
    const biome = {
      name: params.get(`${prefix}_name`),
      color: defaultBiome.color,
      accentColor: defaultBiome.accentColor,
      position: {
        x: parseFloat(params.get(`${prefix}_x`)) || 0.5,
        y: parseFloat(params.get(`${prefix}_y`)) || 0.5
      },
      regionRadius: parseFloat(params.get(`${prefix}_radius`)) || 0.18,
      movementPattern: params.get(`${prefix}_pattern`) || 'spiral',
      movementSpeed: parseFloat(params.get(`${prefix}_speed`)) || 0.001,
      chaos: parseFloat(params.get(`${prefix}_chaos`)) || 0.5,
      weight: parseFloat(params.get(`${prefix}_weight`)) || 1.0,
      link: params.get(`${prefix}_link`) || ''
    };
    
    // Propriedades opcionais
    if (params.has(`${prefix}_attract`)) {
      biome.attractionForce = parseFloat(params.get(`${prefix}_attract`));
    }
    if (params.has(`${prefix}_repel`)) {
      biome.repelForce = parseFloat(params.get(`${prefix}_repel`));
    }
    if (params.has(`${prefix}_ego`)) {
      biome.egoForce = parseFloat(params.get(`${prefix}_ego`));
    }
    
    // Propriedades especiais preservadas do default
    if (defaultBiome.flowThrough !== undefined) {
      biome.flowThrough = defaultBiome.flowThrough;
    }
    if (defaultBiome.isMutant !== undefined) {
      biome.isMutant = defaultBiome.isMutant;
      biome.colorCycle = defaultBiome.colorCycle;
    }
    
    biomes.push(biome);
    index++;
  }
  
  return biomes;
}

// Hook customizado para sincronizar estado com URL
export function useURLState(biomes, setBiomes, defaultBiomes) {
  const isFirstLoad = useRef(true);
  const updateURLDebounced = useRef(
    debounce((biomesData) => {
      const queryString = serializeBiomesToURL(biomesData);
      const newURL = `${window.location.pathname}?${queryString}`;
      window.history.replaceState({}, '', newURL);
    }, 200)
  ).current;
  
  // Carregar da URL na primeira renderização
  useEffect(() => {
    if (isFirstLoad.current) {
      const biomesFromURL = deserializeBiomesFromURL(defaultBiomes);
      if (window.location.search) {
        setBiomes(biomesFromURL);
      }
      isFirstLoad.current = false;
    }
  }, []);
  
  // Atualizar URL quando biomes mudar
  useEffect(() => {
    if (!isFirstLoad.current) {
      updateURLDebounced(biomes);
    }
  }, [biomes, updateURLDebounced]);
  
  // Função para copiar URL
  const copyURL = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      return true;
    }).catch(err => {
      console.error('Erro ao copiar URL:', err);
      return false;
    });
  };
  
  return { copyURL };
}

export { serializeBiomesToURL, deserializeBiomesFromURL };
