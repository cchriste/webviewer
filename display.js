
var add_dataset=function(ds_server,ds_name,ds_width,ds_height,ds_levels,tile_size,palette,field) {
  var half_max_levels=parseInt(ds_levels/2,10);
  if (palette !== undefined) {
    palette="&palette="+palette;
  }
  else {
    palette="";
  }
  if (field !== undefined) {
    field="&field="+field;
  }                                      
  else {
    field="";
  }
  return {
    height: ds_height,
    width:  ds_width,
    tileSize: tile_size,
    minLevel: 0,
    maxLevel: half_max_levels,
    getTileUrl: function( level, x, y ){
      var scale = Math.pow(2, half_max_levels-level);
      var level_tile_size = tile_size*scale;

      var bbox0 = level_tile_size*x
      var bbox1 = Math.min(level_tile_size*(x+1)-1, ds_width)
      var bbox3 = ds_height - level_tile_size*y
      var bbox2 = ds_height - Math.min(level_tile_size*(y+1)-1, ds_height)

      return (ds_server + "action=boxquery&box=" + bbox0 + "%20" + bbox1+ "%20" + bbox2 + "%20" + bbox3 + "&compression=png&dataset=" + ds_name + "&maxh=" + ds_levels + "&toh=" + level*2 + palette + field)
    }
  };
}

var multi_data = function(widths, heights, levels, datasets, servers){
    var tile_size=512;
      OpenSeadragon({
        id: "viewer",
        prefixUrl: "openseadragon/images/",
        showNavigator: true,
        showReferenceStrip: true,
        navigatorPosition:   "TOP_RIGHT",
        sequenceMode: true,
        preserveViewport: false,
        defaultZoomLevel: 0, //fit best
        //minZoomLevel: 0,
        //maxZoomLevel: 50,
        minZoomImageRatio: 0.25,
        maxZoomImageRatio: 4.0,
        tileSources:   [add_dataset(servers[2],datasets[2],widths[2],heights[2],levels[2],tile_size)]
//        tileSources:   [add_dataset(servers[0],datasets[0],widths[0],heights[0],levels[0],tile_size),add_dataset(servers[1],datasets[1],widths[1],heights[1],levels[1],tile_size),add_dataset(servers[2],datasets[2],widths[2],heights[2],levels[2],tile_size),add_dataset(servers[3],datasets[3],widths[3],heights[3],levels[3],tile_size),add_dataset(servers[4],datasets[4],widths[4],heights[4],levels[4],tile_size)]
      }); 
}

function openDataset(server, dataset, width, height, levels, palette, field){
  var tile_size=512;
  OpenSeadragon({
    id: "viewer",
    prefixUrl: "openseadragon/images/",
    showNavigator: true,
    showReferenceStrip: false,
    navigatorPosition:   "TOP_RIGHT",
    immediateRender: true,
    defaultZoomLevel: 0, //fit best
    maxImageCacheCount: 500, //default is 200 "per drawer"
    sequenceMode: false,
    preserveViewport: true,  //probably ignored when sequenceMode=false
    minZoomImageRatio: 0.25,
    maxZoomImageRatio: 4.0,
    tileSources:   [add_dataset(server+"/mod_visus?",dataset,width,height,levels,tile_size,palette,field)]
  }); 
}
