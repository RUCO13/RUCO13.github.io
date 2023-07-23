let element = document.querySelector('#container-01');
let data_dir = 'scripts/GaAs.xyz';
let viewer = $3Dmol.createViewer(element, { backgroundColor: 'transparent' });
jQuery.ajax(data_dir, {
  success: function(data) {
    viewer.addModel(data, "xyz", {
      doAssembly: true,
      duplicateAssemblyAtoms: true,
      normalizeAssembly: true
    }); /* load data */
    viewer.setStyle({ sphere: { colorscheme: 'Jmol', scale: 0.3 }, stick: { colorscheme: 'Jmol', radius: 0.15 } }); /* style all atoms */
    viewer.spin("vy",3);
    viewer.zoomTo();
    viewer.zoom(0.7); /* set camera */
    viewer.render(); /* render scene */
  },
  error: function(hdr, status, err) {
    console.error("Failed to load data " + data_dir + ": " + err);
  },
});


