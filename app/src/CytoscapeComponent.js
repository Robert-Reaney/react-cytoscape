import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';

const default_graph_elements = [
    { data: { id: 'A', name: "Company 1", country: "US" } },
    { data: { id: 'B', name: "Company 2", country: "US" } },
    { data: { id: 'C', name: "Company 3", country: "China" } },
    { data: { source: 'A', target: 'C' } },
    { data: { source: 'A', target: 'B' } }
]

const CytoscapeComponent = () => {

    const containerRef = useRef(null);
    const [filterCountry, setFilterCountry] = useState("");
    const [graph_elements, setElements] = useState( default_graph_elements); // [variable, function_to_set] = default(val)
    const [searchValue, setSearchValue] = useState("");  // State to hold the input's value

    // const handleSearchChange = async (e) => {
    //     const companyName = e.target.value;
    //     if (companyName) {
    //         try {
    //             const response = await fetch(`http://gpurhel8.mil.intellibridgelabs.io:5005/companies/${companyName}`);
    //             const data = await response.json();
    //             console.log(data)
    //             setElements(data);
    //         } catch (error) {
    //             console.error("Error fetching company data:", error);
    //         }
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent the default form submission behavior
    
        const companyName = searchValue;
        if (companyName) {
            try {
                const response = await fetch(`http://gpurhel8.mil.intellibridgelabs.io:5005/companies/${companyName}`);
                const data = await response.json();
                console.log(data);
                setElements(data);
            } catch (error) {
                console.error("Error fetching company data:", error);
            }
        }
    };

    useEffect(() => {
        const cy = cytoscape({
            container: containerRef.current,
            elements: graph_elements
            // [
            //     { data: { id: 'A', name: "Company 1", country: "US" } },
            //     { data: { id: 'B', name: "Company 2", country: "US" } },
            //     { data: { id: 'C', name: "Company 3", country: "China" } },
            //     { data: { source: 'A', target: 'C' } },
            //     { data: { source: 'A', target: 'B' } }
            // ]
            ,
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': '#FF0',
                        'label': 'data(name)',
                        'color': '#FFF'
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

        // Function to update the graph based on the filter
        const updateGraphFilter = (country) => {
            // Reset the graph to show all nodes first
            cy.elements().restore();

            // If a country is selected to be filtered out, remove those nodes
            if (country) {
                cy.filter(`node[country = "${country}"]`).remove();
            }
        };

        updateGraphFilter(filterCountry); // Initial setup of filter

        // Cleanup function for useEffect
        return () => {
            cy.destroy();
        };
    }, [filterCountry, graph_elements]);

    return (
        <div style={{ position: 'relative', width: '1200px', height: '800px', backgroundColor: '#000' }}>
        <div style={{ zIndex: 2, padding: '10px', position: 'absolute', top: '10px', left: '10px' }}>
        <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Search for a company..." 
                    style={{ fontSize: '24pt', marginRight: '10px', width: '900px' }} 
                    value={searchValue}  // bind input to the state
                    onChange={e => setSearchValue(e.target.value)}  // update state on input change
                />
                <button type="submit" style={{ fontSize: '24pt', padding: '6px 12px' }}>
                    Submit Search
                </button>
            </form>
        </div>
        <div style={{ 
            position: 'absolute', 
            bottom: '10px', 
            right: '10px', 
            zIndex: 2 
        }}>
            <label style={{ fontSize: '24px', color: '#FFF' }}>
                Filter out nodes from:
                <select 
                    value={filterCountry} 
                    onChange={e => setFilterCountry(e.target.value)}
                    style={{ fontSize: '24px', padding: '5px', margin: '0 10px' }}
                >
                    <option value="">--Select Country--</option>
                    <option value="US">US</option>
                    <option value="China">China</option>
                </select>
            </label>
        </div>
        <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
    );
};

export default CytoscapeComponent;
