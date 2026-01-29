import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ControlPanel({ biomes, onUpdate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBiome, setSelectedBiome] = useState(0);

  const handleChange = (biomeName, property, value) => {
    onUpdate(biomeName, property, parseFloat(value));
  };

  const currentBiome = biomes[selectedBiome];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 px-4 py-2 rounded-lg backdrop-blur-md border transition-all duration-300"
        style={{
          background: 'rgba(2, 6, 23, 0.9)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
        }}
        data-testid="control-panel-toggle"
      >
        <span className="text-white text-sm font-medium">
          {isOpen ? '✕ Fechar Controles' : '⚙️ Controles'}
        </span>
      </button>

      {/* Control Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed top-0 right-0 h-screen w-96 z-40 overflow-y-auto"
            style={{
              background: 'rgba(2, 6, 23, 0.95)',
              backdropFilter: 'blur(20px)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Painel de Controle
              </h2>

              {/* Biome Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Selecionar Bioma
                </label>
                <select
                  value={selectedBiome}
                  onChange={(e) => setSelectedBiome(parseInt(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg backdrop-blur-md border"
                  style={{
                    background: 'rgba(15, 23, 42, 0.8)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white'
                  }}
                  data-testid="biome-selector"
                >
                  {biomes.map((biome, index) => (
                    <option key={index} value={index}>
                      {biome.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Current Biome Display */}
              <div 
                className="mb-6 p-4 rounded-lg"
                style={{
                  background: `${currentBiome.color}20`,
                  border: `2px solid ${currentBiome.color}40`
                }}
              >
                <h3 className="text-lg font-bold text-white mb-2">
                  {currentBiome.name}
                </h3>
                <div className="text-xs text-white/60">
                  Padrão: {currentBiome.movementPattern}
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-5">
                {/* Position X */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Posição X: {currentBiome.position.x.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="0.9"
                    step="0.01"
                    value={currentBiome.position.x}
                    onChange={(e) => handleChange(currentBiome.name, 'position.x', e.target.value)}
                    className="w-full"
                    data-testid={`${currentBiome.name}-position-x`}
                  />
                </div>

                {/* Position Y */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Posição Y: {currentBiome.position.y.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="0.9"
                    step="0.01"
                    value={currentBiome.position.y}
                    onChange={(e) => handleChange(currentBiome.name, 'position.y', e.target.value)}
                    className="w-full"
                    data-testid={`${currentBiome.name}-position-y`}
                  />
                </div>

                {/* Movement Speed */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Velocidade: {(currentBiome.movementSpeed * 1000).toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0.0001"
                    max="0.005"
                    step="0.0001"
                    value={currentBiome.movementSpeed}
                    onChange={(e) => handleChange(currentBiome.name, 'movementSpeed', e.target.value)}
                    className="w-full"
                    data-testid={`${currentBiome.name}-speed`}
                  />
                </div>

                {/* Chaos */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Caos: {(currentBiome.chaos * 100).toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={currentBiome.chaos}
                    onChange={(e) => handleChange(currentBiome.name, 'chaos', e.target.value)}
                    className="w-full"
                    data-testid={`${currentBiome.name}-chaos`}
                  />
                </div>

                {/* Weight */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Densidade (Weight): {currentBiome.weight.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={currentBiome.weight}
                    onChange={(e) => handleChange(currentBiome.name, 'weight', e.target.value)}
                    className="w-full"
                    data-testid={`${currentBiome.name}-weight`}
                  />
                </div>

                {/* Region Radius */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Raio da Região: {currentBiome.regionRadius.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0.05"
                    max="0.35"
                    step="0.01"
                    value={currentBiome.regionRadius}
                    onChange={(e) => handleChange(currentBiome.name, 'regionRadius', e.target.value)}
                    className="w-full"
                    data-testid={`${currentBiome.name}-radius`}
                  />
                </div>

                {/* Attraction Force (if exists) */}
                {currentBiome.attractionForce !== undefined && (
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Força de Atração: {currentBiome.attractionForce.toFixed(2)}
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="3"
                      step="0.1"
                      value={currentBiome.attractionForce}
                      onChange={(e) => handleChange(currentBiome.name, 'attractionForce', e.target.value)}
                      className="w-full"
                      data-testid={`${currentBiome.name}-attraction`}
                    />
                  </div>
                )}

                {/* Repel Force (if exists) */}
                {currentBiome.repelForce !== undefined && (
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Força de Repulsão: {currentBiome.repelForce.toFixed(2)}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="3"
                      step="0.1"
                      value={currentBiome.repelForce}
                      onChange={(e) => handleChange(currentBiome.name, 'repelForce', e.target.value)}
                      className="w-full"
                      data-testid={`${currentBiome.name}-repel`}
                    />
                  </div>
                )}

                {/* Ego Force (if exists) */}
                {currentBiome.egoForce !== undefined && (
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Força do Ego: {currentBiome.egoForce.toFixed(2)}
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="5"
                      step="0.1"
                      value={currentBiome.egoForce}
                      onChange={(e) => handleChange(currentBiome.name, 'egoForce', e.target.value)}
                      className="w-full"
                      data-testid={`${currentBiome.name}-ego`}
                    />
                  </div>
                )}
              </div>

              {/* Export Config Button */}
              <button
                onClick={() => {
                  const config = JSON.stringify(biomes, null, 2);
                  console.log('Current Configuration:', config);
                  navigator.clipboard.writeText(config);
                  alert('Configuração copiada para clipboard!');
                }}
                className="w-full mt-6 px-4 py-3 rounded-lg backdrop-blur-md border transition-all duration-300"
                style={{
                  background: 'rgba(0, 155, 58, 0.2)',
                  borderColor: 'rgba(0, 155, 58, 0.4)',
                }}
                data-testid="export-config"
              >
                <span className="text-white text-sm font-medium">
                  📋 Copiar Configuração
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
