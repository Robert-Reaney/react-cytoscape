// CytoscapeComponent.js
import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';

const CytoscapeComponent = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const cy = cytoscape({
            container: containerRef.current,
            elements: [
                // List of graph elements to start with
                { data: { id: 'A' } },
                { data: { id: 'B' } },
                { data: { source: 'A', target: 'B' } }
            ],
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': '#666',
                        'label': 'data(id)'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 3,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'triangle'
                    }
                }
            ],
            layout: {
                name: 'grid'
            }
        });
    }, []);

    return <div ref={containerRef} style={{ width: '600px', height: '600px' }} />;
};

export default CytoscapeComponent;
