let element = document.querySelector('#container-01');
let pdbUri = 'scripts/GaAs.pdb';
let viewer = $3Dmol.createViewer(element, { backgroundColor: '#6e6e80' });

jQuery.ajax(pdbUri, {
  success: function(data) {
    viewer.addModel(data, "pdb", {
      doAssembly: true,
      duplicateAssemblyAtoms: true,
      normalizeAssembly: true
    }); /* load data */
    viewer.setStyle({ sphere: { colorscheme: 'Jmol', scale: 0.3 }, stick: { colorscheme: 'Jmol', radius: 0.15 } }); /* style all atoms */
    viewer.spin();
    viewer.zoomTo(); /* set camera */
    viewer.render(); /* render scene */
  },
  error: function(hdr, status, err) {
    console.error("Failed to load PDB " + pdbUri + ": " + err);
  },
});