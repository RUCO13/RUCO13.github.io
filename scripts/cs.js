// Cargar el archivo JSON
fetch('scripts/GaAs.json')
  .then(response => response.json())
  .then(data => {
    // Convertir el objeto JSON a una estructura de datos compatible con Plotly
    const structureData = convertToPlotlyData(data);

    // Configurar el trazado de la estructura utilizando Plotly
    const plotlyConfig = configurePlotlyPlot(structureData);

    // Renderizar el gráfico en el contenedor 'plotlyContainer'
    Plotly.newPlot('plotlyContainer', plotlyConfig.data, plotlyConfig.layout, { displayModeBar: false });
  })
  .catch(error => {
    console.error('Error al cargar el archivo JSON:', error);
  });

// Función para convertir el archivo JSON en datos compatibles con Plotly
function convertToPlotlyData(jsonData) {
    const sites = jsonData.sites;
    const atoms = [];
    const x = [];
    const y = [];
    const z = [];
    const connections = [];
  
    // Extraer las coordenadas x, y, z de los átomos del archivo JSON
    for (let i = 0; i < sites.length; i++) {
        const atom = sites[i];
        const { xyz } = atom;
        const [xCoord, yCoord, zCoord] = xyz;
        x.push(xCoord);
        y.push(yCoord);
        z.push(zCoord);
        atoms.push(atom.species[0].element);
    
        // Obtener los índices de los átomos conectados
        const connectedAtoms = atom.properties.connectivity || [];
        for (let j = 0; j < connectedAtoms.length; j++) {
          const connectedAtomIndex = connectedAtoms[j];
          connections.push([i, connectedAtomIndex]);
        }
      }

  // Crear una lista de enlaces únicos sin duplicados
  const uniqueConnections = Array.from(new Set(connections.map(JSON.stringify)), JSON.parse);
  
    // Devolver los datos convertidos en un formato compatible con Plotly
    return [
        {
          type: 'scatter3d',
          mode: 'markers',
          x: x,
          y: y,
          z: z,
          text: atoms,
          marker: {
            size: 5,
            color: 'blue'
          },
          hovertemplate: '%{text}',
          name: 'Átomos'
        },
        {
          type: 'scatter3d',
          mode: 'lines',
          x: uniqueConnections.map(c => [x[c[0]], x[c[1]], null]).flat(),
          y: uniqueConnections.map(c => [y[c[0]], y[c[1]], null]).flat(),
          z: uniqueConnections.map(c => [z[c[0]], z[c[1]], null]).flat(),
          line: {
            width: 3,
            color: 'black'
          },
          hoverinfo: 'none',
          name: 'Enlaces'
        }
      ];
    }
    
// Función para configurar el trazado del gráfico en Plotly
function configurePlotlyPlot(data) {
  const layout = {
    scene: {
      aspectmode: 'cube',
      xaxis: { visible: false },
      yaxis: { visible: false },
      zaxis: { visible: false },
      bgcolor: '#6e6e80' // Fondo transparente
    },
    width: 350,
    height: 300,
    showlegend: false,
    margin: {
      l: 0,
      r: 0,
      t: 0,
      b: 0
    }
  };

  // Devolver la configuración del trazado y el diseño del gráfico en Plotly
  return {
    data: data,
    layout: layout
  };
}
