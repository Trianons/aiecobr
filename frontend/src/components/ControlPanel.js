import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ControlPanel({ biomes, onUpdate, customBiomes, onAddCustomBiome, onRemoveCustomBiome }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBiome, setSelectedBiome] = useState(0);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customForm, setCustomForm] = useState({
    name: '',
    link: '',
    color: '#22d3ee',
    positionX: 0.5,
    positionY: 0.5
  });

  const handleChange = (biomeName, property, value) => {
    onUpdate(biomeName, property, parseFloat(value));
  };
  
  const handleTextChange = (biomeName, property, value) => {
    onUpdate(biomeName, property, value);
  };

  const handleAddCustom = () => {
    if (customForm.name && customForm.link) {
      onAddCustomBiome({
        name: customForm.name,
        color: customForm.color,
        accentColor: customForm.color,
        position: { x: customForm.positionX, y: customForm.positionY },
        link: customForm.link,
        regionRadius: 0.15,
        movementPattern: 'orbital',
        movementSpeed: 0.001,
        chaos: 0.5,
        weight: 0.5,
        isCustom: true
      });
      setCustomForm({
        name: '',
        link: '',
        color: '#22d3ee',
        positionX: 0.5,
        positionY: 0.5
      });
      setShowCustomForm(false);
    }
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
                <div className="text-xs text-white/60 mb-2">
                  Padrão: {currentBiome.movementPattern}
                </div>
                
                {/* Link Input */}
                <div className="mt-3">
                  <label className="block text-xs font-medium text-white/70 mb-1">
                    Link (URL)
                  </label>
                  <input
                    type="text"
                    value={currentBiome.link || ''}
                    onChange={(e) => handleTextChange(currentBiome.name, 'link', e.target.value)}
                    placeholder="https://exemplo.com"
                    className="w-full px-3 py-1.5 text-xs rounded backdrop-blur-md border"
                    style={{
                      background: 'rgba(15, 23, 42, 0.8)',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white'
                    }}
                    data-testid={`${currentBiome.name}-link-input`}
                  />
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

              {/* Divider */}
              <div className="my-6 h-px bg-white/10"></div>

              {/* Custom Biome Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">
                    Caixas Personalizadas
                  </h3>
                  <button
                    onClick={() => setShowCustomForm(!showCustomForm)}
                    className="px-3 py-1 text-xs rounded backdrop-blur-md border transition-all"
                    style={{
                      background: 'rgba(0, 155, 58, 0.2)',
                      borderColor: 'rgba(0, 155, 58, 0.4)',
                    }}
                    data-testid="toggle-custom-form"
                  >
                    {showCustomForm ? 'Cancelar' : '+ Nova Caixa'}
                  </button>
                </div>

                {/* Custom Form */}
                {showCustomForm && (
                  <div className="p-4 rounded-lg mb-4" style={{ background: 'rgba(15, 23, 42, 0.6)' }}>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-white/70 mb-1">Nome</label>
                        <input
                          type="text"
                          value={customForm.name}
                          onChange={(e) => setCustomForm({...customForm, name: e.target.value})}
                          placeholder="Ex: Inovação"
                          className="w-full px-3 py-2 text-sm rounded backdrop-blur-md border"
                          style={{
                            background: 'rgba(15, 23, 42, 0.8)',
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            color: 'white'
                          }}
                          data-testid="custom-name-input"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-white/70 mb-1">Link (URL)</label>
                        <input
                          type="text"
                          value={customForm.link}
                          onChange={(e) => setCustomForm({...customForm, link: e.target.value})}
                          placeholder="https://exemplo.com"
                          className="w-full px-3 py-2 text-sm rounded backdrop-blur-md border"
                          style={{
                            background: 'rgba(15, 23, 42, 0.8)',
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            color: 'white'
                          }}
                          data-testid="custom-link-input"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-white/70 mb-1">Cor</label>
                        <input
                          type="color"
                          value={customForm.color}
                          onChange={(e) => setCustomForm({...customForm, color: e.target.value})}
                          className="w-full h-10 rounded cursor-pointer"
                          data-testid="custom-color-input"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-medium text-white/70 mb-1">Pos X</label>
                          <input
                            type="number"
                            min="0.1"
                            max="0.9"
                            step="0.05"
                            value={customForm.positionX}
                            onChange={(e) => setCustomForm({...customForm, positionX: parseFloat(e.target.value)})}
                            className="w-full px-2 py-1.5 text-sm rounded backdrop-blur-md border"
                            style={{
                              background: 'rgba(15, 23, 42, 0.8)',
                              borderColor: 'rgba(255, 255, 255, 0.2)',
                              color: 'white'
                            }}
                            data-testid="custom-position-x"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium text-white/70 mb-1">Pos Y</label>
                          <input
                            type="number"
                            min="0.1"
                            max="0.9"
                            step="0.05"
                            value={customForm.positionY}
                            onChange={(e) => setCustomForm({...customForm, positionY: parseFloat(e.target.value)})}
                            className="w-full px-2 py-1.5 text-sm rounded backdrop-blur-md border"
                            style={{
                              background: 'rgba(15, 23, 42, 0.8)',
                              borderColor: 'rgba(255, 255, 255, 0.2)',
                              color: 'white'
                            }}
                            data-testid="custom-position-y"
                          />
                        </div>
                      </div>
                      
                      <button
                        onClick={handleAddCustom}
                        className="w-full px-4 py-2 rounded-lg backdrop-blur-md border transition-all mt-3"
                        style={{
                          background: 'rgba(0, 155, 58, 0.3)',
                          borderColor: 'rgba(0, 155, 58, 0.5)',
                        }}
                        data-testid="add-custom-biome"
                      >
                        <span className="text-white text-sm font-medium">Adicionar Caixa</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Custom Biomes List */}
                {customBiomes.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-white/50 mb-2">
                      Caixas Criadas ({customBiomes.length})
                    </div>
                    {customBiomes.map((custom, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded backdrop-blur-md border"
                        style={{
                          background: 'rgba(15, 23, 42, 0.6)',
                          borderColor: `${custom.color}40`,
                        }}
                      >
                        <div>
                          <div className="text-sm font-medium text-white">{custom.name}</div>
                          <div className="text-xs text-white/50 truncate max-w-[200px]">{custom.link}</div>
                        </div>
                        <button
                          onClick={() => onRemoveCustomBiome(index)}
                          className="px-2 py-1 text-xs rounded text-red-400 hover:bg-red-500/20"
                          data-testid={`remove-custom-${index}`}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Export Config Button */}
              <button
                onClick={() => {
                  const config = { biomes, customBiomes };
                  console.log('Current Configuration:', config);
                  navigator.clipboard.writeText(JSON.stringify(config, null, 2));
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
