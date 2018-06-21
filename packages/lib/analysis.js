module.exports = function(dir){
    var blessed = require('blessed')
        , contrib = require('blessed-contrib')
        , screen = blessed.screen();

    var bar = contrib.bar(
        { label: 'Server Utilization (%)'
            , barWidth: 8
            , barSpacing: 10
            , xOffset: 5
            , maxHeight: 9
            , barBgColor: 'green'
            , barFgColor: 'red'
        })
    screen.append(bar) //must append before setting data
    bar.setData(
        { titles: ['bar1', 'bar2']
            , data: [5, 10]});

    screen.render();
    // process.exit(0);
};

// function analysisAssets(dir){
//     let images
// }