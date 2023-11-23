import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataFilter = () => {
    const [sector, setSector] = useState('');
    const [region, setRegion] = useState('');
    const [country, setCountry] = useState('');
    const [topic, setTopic] = useState('');
    const [endYear, setEndYear] = useState('');
    const [source, setSource] = useState('');
    const [pestle, setPestle] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('Country');

    // Dummy list of countries, sectors, and regions
    const countriesList = ['United States of America', 'India', 'Mexico', 'Russia', 'Brazil', 'China', 'Oman', 'Pakistan', 'Australia', 'Japan', 'Indonesia', 'Iraq'];
    const sectorsList = ['Energy', 'Environment', 'Government', 'Manufacturing', 'Aerospace & defence',];
    const regionsList = ['Asia', 'Europe', 'Northern America', 'World', 'Western Asia', ''];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const apiUrl = `https://admin-panel-6prv.onrender.com/api/data?sector=${sector}&region=${region}&country=${country}&topic=${topic}&endYear=${endYear}&source=${source}&pestle=${pestle}`;

                const response = await axios.get(apiUrl);
                console.log('API Response:', response);

                setFilteredData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [sector, region, country, topic, endYear, source, pestle]);

    const renderDataColumn = (data) => {
        const filteredItems = data.filter((item) => {
            switch (selectedFilter) {
                case 'Country':
                    return item.country === country;
                case 'Region':
                    return item.region === region;
                case 'Sector':
                    return item.sector === sector;
                default:
                    return true; // Display all if no filter is selected
            }
        });

        const slicedItems = filteredItems.slice(0, 25);

        return (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {loading && <p>Loading...</p>}
                {!loading && slicedItems.length === 0 && <p>No data found.</p>}
                {slicedItems.map((item) => (
                    <div key={item._id} style={styles.card}>
                        <p style={styles.field}>
                            <strong>Region:</strong> {item.region}
                        </p>
                        <p style={styles.field}>
                            <strong>Country:</strong> {item.country}
                        </p>
                        <p style={styles.field}>
                            <strong>Sector:</strong> {item.sector}
                        </p>
                        <p style={styles.field}>
                            <strong>Topic:</strong> {item.topic}
                        </p>
                        <p style={styles.field}>
                            <strong>End Year:</strong> {item.end_year}
                        </p>
                        <p style={styles.field}>
                            <strong>Source:</strong> {item.source}
                        </p>
                        <p style={styles.field}>
                            <strong>Pestle:</strong> {item.pestle}
                        </p>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            <div style={styles.filtersContainer}>
                <div style={styles.filterItem}>
                    <label>Country:</label>
                    <select style={styles.select} value={country} onChange={(e) => setCountry(e.target.value)}>
                        <option value="">Select Country</option>
                        {countriesList.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={styles.filterItem}>
                    <label>Region:</label>
                    <select style={styles.select} value={region} onChange={(e) => setRegion(e.target.value)}>
                        <option value="">Select Region</option>
                        {regionsList.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={styles.filterItem}>
                    <label>Sector:</label>
                    <select style={styles.select} value={sector} onChange={(e) => setSector(e.target.value)}>
                        <option value="">Select Sector</option>
                        {sectorsList.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={styles.filterItem}>
                    <label>Topic:</label>
                    <input style={styles.input} type="text" value={topic} onChange={(e) => setTopic(e.target.value)} />
                </div>

                <div style={styles.filterItem}>
                    <label>End Year:</label>
                    <input style={styles.input} type="text" value={endYear} onChange={(e) => setEndYear(e.target.value)} />
                </div>

                <div style={styles.filterItem}>
                    <label>Source:</label>
                    <input style={styles.input} type="text" value={source} onChange={(e) => setSource(e.target.value)} />
                </div>

                <div style={styles.filterItem}>
                    <label>Pestle:</label>
                    <input style={styles.input} type="text" value={pestle} onChange={(e) => setPestle(e.target.value)} />
                </div>

                <div style={styles.filterItem}>
                    <label>Show Data for:</label>
                    <select style={styles.select} value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}>
                        <option value="Country">Country</option>
                        <option value="Region">Region</option>
                        <option value="Sector">Sector</option>
                    </select>
                </div>
            </div>

            <div style={styles.dataContainer}>
                {renderDataColumn(filteredData)}
            </div>
        </div>
    );
};

const styles = {
    filtersContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: '20px',
        flexWrap: 'wrap',
    },
    filterItem: {
        flex: 1,
        marginRight: '10px',
        marginBottom: '10px',
    },
    select: {
        width: '100%',
        padding: '8px',
    },
    input: {
        width: '100%',
        padding: '8px',
    },


    dataContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        marginTop: '20px',
    },

    card: {
        border: '1px solid #ccc',
        padding: '10px',
        margin: '10px',
        width: 'calc(33.33% - 20px)', // Adjust the width to achieve three cards per row
        boxSizing: 'border-box',
    },

    // ... (remaining styles)

    field: {
        marginBottom: '8px',
    },
};

export default DataFilter;
