//document.querySelector("#start").addEventListener("click", save)
let objGo = go.GraphObject.make;
let myDiagram = objGo(go.Diagram, "myDiagramDiv",
    {
        initialContentAlignment: go.Spot.Center,// center diagram contents
        "undoManager.isEnabled": true,          // enable Ctrl-Z to undo and Ctrl-Y to redo
        allowZoom: false,                       // enable zoom diagram
        "grid.visible": false,                  
        "commandHandler.copiesTree": true,
        "commandHandler.deletesTree": true,
        "draggingTool.dragsTree": false,
    });

myDiagram.layout = objGo(go.LayeredDigraphLayout,{ 
    direction: 0,
    layerSpacing: 150,
    columnSpacing: 0,
    layeringOption: go.LayeredDigraphLayout.LayerLongestPathSink
});



let myModel = objGo(go.GraphLinksModel);

var patternBrush = $(go.Brush, "white");

myModel.nodeDataArray = [
    { key: "Food Sensor Left" },
    { key: "Food Sensor Right" },
    { key: "Obstacle Sensor Left" },
    { key: "Obstacle Sensor Right" },
    { key: "Left Motor" },
    { key: "Right Motor" },
];

myModel.linkDataArray =
    [
        { from: "Food Sensor Left", to: "Left Motor", poid: "w1", text: 0 },
        { from: "Food Sensor Left", to: "Right Motor", poid: "w2", text: 0 },
        { from: "Food Sensor Right", to: "Left Motor", poid: "w3", text: 10},
        { from: "Food Sensor Right", to: "Right Motor", poid: "w4", text: 10},
        { from: "Obstacle Sensor Left", to: "Left Motor", poid: "w5", text: 10},
        { from: "Obstacle Sensor Left", to: "Right Motor", poid: "w6", text: 0},
        { from: "Obstacle Sensor Right", to: "Left Motor", poid: "w7", text: 0},
        { from: "Obstacle Sensor Right", to: "Right Motor", poid: "w8", text: 10},
    ];

myDiagram.model = myModel;



let linkSelectionAdornmentTemplate =
    objGo(go.Adornment, "Link",
        objGo(go.Shape,
            // isPanelMain declares that this Shape shares the Link.geometry
            { isPanelMain: true, fill: null, stroke: "deepskyblue", strokeWidth: 0 })
    );

myDiagram.linkTemplate =
    objGo(go.Link,
        { selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate },
        { relinkableFrom: false, relinkableTo: false, reshapable: false },
        {
            toShortLength: 4
        },
        new go.Binding("points").makeTwoWay(),
        objGo(go.Shape,  // the link path shape
            { isPanelMain: true, strokeWidth: 2 , stroke: "black"}),
        objGo(go.Shape,  // the arrowhead
            { toArrow: "Standard", stroke: "black" }),
        objGo(go.Panel, "Auto",
            new go.Binding("visible", "null").ofObject(),
            objGo(go.Shape, "RoundedRectangle",  // the link shape
                { fill: "gold", stroke: null }),
            objGo(go.TextBlock,
                {
                    textAlign: "center",
                    font: "10pt helvetica, arial, sans-serif",
                    stroke: "black",
                    margin: 2,
                    minSize: new go.Size(10, NaN),
                    editable: true
                },
                new go.Binding("text").makeTwoWay())
        )
    );


myDiagram.addDiagramListener("Modified", function() {
    let button = document.getElementById("start");
    if (button) button.disabled = !myDiagram.isModified;
    let idx = document.title.indexOf("*");
    if (myDiagram.isModified) {
        if (idx < 0) document.title += "*";
    } else {
        if (idx >= 0) document.title = document.title.substr(0, idx);
    }
});

//let nono = new Robot(1, 2, 3);

function get_nn_parameter() {
    let linkDataArray = JSON.parse(myDiagram.model.toJson()).linkDataArray;
    let w1 = parseInt(linkDataArray[0].text);
    let w2 = parseInt(linkDataArray[1].text);
    let w3 = parseInt(linkDataArray[2].text);
    let w4 = parseInt(linkDataArray[3].text);
    let w5 = parseInt(linkDataArray[4].text);
    let w6 = parseInt(linkDataArray[5].text);
    let w7 = parseInt(linkDataArray[6].text);
    let w8 = parseInt(linkDataArray[7].text);
    return [w1, w2, w3, w4, w5, w6, w7, w8];
}






