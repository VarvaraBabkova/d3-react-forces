import React from 'react';
import './App.css';
import * as d3 from 'd3';

class App extends React.Component{
  constructor(props){
      super(props);
      this.myRef = React.createRef();
      //this.dataset = [10, 20, 30, 40, 50];
      this.dataset = {
        nodes:[
          {node: "node1"},
          {node: "node2"},
          {node: "node3"},
          {node: "node4"},
          {node: "node5"},
        ],
        edges:[
          {source: 0, target: 1},
          {source: 1, target: 2},
          {source: 2, target: 3},
          {source: 2, target: 4},
          {source: 1, target: 4},

        ]
      }

  }

  componentDidMount(){
      // console.log(this.myRef);
      // d3.select(this.myRef.current)
      //   .append('p')
      //   .text('hello from d3');
      let size = 500;

      let svg = d3.select(this.myRef.current)
                  .append("svg")
                  .attr("width", size)
                  .attr("height", size);

      //  svg.selectAll('rect')
      //    .data(this.dataset)
      //    .enter()
      //    .append('rect')
      //    .attr("x", (d, i) => i*21)
      //    .attr("y", d => 50 - d)
      //    .attr('width', 20)
      //    .attr('height', d => d)
      //    .attr("fill", 'teal');

      var force = d3.forceSimulation(this.dataset.nodes)
                    .force("charge", d3.forceManyBody().strength(-150))
                    .force("link", d3.forceLink(this.dataset.edges).distance(70))
                    .force("center", d3.forceCenter().x(size/2).y(size/2));

      var edges = svg.selectAll("line")
                      .data(this.dataset.edges)
                      .enter()
                      .append("line")
                      .style("stroke", "#ccc")
                      .style("stroke-width", 1);
      var nodes = svg.selectAll("circle")
                      .data(this.dataset.nodes)
                      .enter()
                      .append("circle")
                      .attr("r", 10)
                      .style("fill", "teal");

      force.on("tick", () =>{
          edges.attr("x1", d=>d.source.x)
                .attr("y1", d=>d.source.y)
                .attr("x2", d=>d.target.x)
                .attr("y2", d=>d.target.y);

          nodes.attr("cx", d => d.x)
              .attr("cy", d => d.y)
      })


  }

  render(){
     return (
    <div width="300" height = "300" ref={this.myRef}>
    </div>
  );
  }
 
}

export default App;
