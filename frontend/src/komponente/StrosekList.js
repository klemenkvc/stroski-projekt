import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StrosekServis from '../servis/StrosekServis';

const StrosekList = () => {
    const [stroski, setStroski] = useState([]);
    const [iskanje, setIskanje] = useState('');
    const [kategorija, setKategorija] = useState('');
    const [kategorije, setKategorije] = useState([]);
    const [sortBy, setSortBy] = useState('id');
    const [sortDir, setSortDir] = useState('asc');

    useEffect(() => {
        StrosekServis.getKategorije()
            .then(response => setKategorije(response.data))
            .catch(error => console.error("Napaka pri pridobivanju kategorij:", error));
    }, []);

    useEffect(() => {
        fetchStroski();
    }, [iskanje, kategorija, sortBy, sortDir]);

    const fetchStroski = async () => {
        try {
            const params = {};
            if (iskanje) params.ime = iskanje;
            if (kategorija) params.kategorija = kategorija;
            params.sortBy = sortBy;
            params.sortDir = sortDir;

            const response = await StrosekServis.getAllStroski(params);
            setStroski(response.data);
        } catch (error) {
            console.error("Napaka pri pridobivanju stroškov:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Ali ste prepričani, da želite izbrisati ta strošek?')) {
            try {
                await StrosekServis.deleteStrosek(id);
                fetchStroski();
            } catch (error) {
                console.error("Napaka pri brisanju stroška:", error);
            }
        }
    };

    const handleSort = (polje) => {
        if (sortBy === polje) {
            setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(polje);
            setSortDir('asc');
        }
    };

    const prikaziPuscico = (polje) => {
        if (sortBy !== polje) return '';
        return sortDir === 'asc' ? ' ▲' : ' ▼';
    };

    return (
        <div>
            <h2>Seznam stroškov</h2>

            
            <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '20px',
                alignItems: 'center',
                flexWrap: 'wrap'
            }}>
                <input
                    type="text"
                    placeholder="Išči po imenu..."
                    value={iskanje}
                    onChange={(e) => setIskanje(e.target.value)}
                    style={{
                        padding: '12px',
                        border: '1px solid #cbd5e0',
                        borderRadius: '6px',
                        fontSize: '15px',
                        background: '#f8fafc',
                        minWidth: '220px'
                    }}
                />
                <select
                    value={kategorija}
                    onChange={(e) => setKategorija(e.target.value)}
                    style={{
                        padding: '12px',
                        border: '1px solid #cbd5e0',
                        borderRadius: '6px',
                        fontSize: '15px',
                        background: '#f8fafc',
                        minWidth: '180px'
                    }}
                >
                    <option value="">Vse kategorije</option>
                    {kategorije.map(k => (
                        <option key={k} value={k}>{k}</option>
                    ))}
                </select>
                {(iskanje || kategorija) && (
                    <button
                        type="button"
                        onClick={() => { setIskanje(''); setKategorija(''); }}
                        style={{
                            background: '#a0aec0',
                            color: 'white',
                            padding: '12px 18px',
                            borderRadius: '6px',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 700
                        }}
                    >
                        Počisti
                    </button>
                )}
            </div>

            {stroski.length === 0 ? (
                <p>Ni najdenih stroškov. Poskusite spremeniti način iskanja ali dodajte nov strošek.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('ime')} style={{ cursor: 'pointer' }}>
                                Ime{prikaziPuscico('ime')}
                            </th>
                            <th onClick={() => handleSort('znesek')} style={{ cursor: 'pointer' }}>
                                Znesek (€){prikaziPuscico('znesek')}
                            </th>
                            <th onClick={() => handleSort('kategorija')} style={{ cursor: 'pointer' }}>
                                Kategorija{prikaziPuscico('kategorija')}
                            </th>
                            <th onClick={() => handleSort('datum')} style={{ cursor: 'pointer' }}>
                                Datum{prikaziPuscico('datum')}
                            </th>
                            <th>Akcije</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stroski.map(strosek => (
                            <tr key={strosek.id}>
                                <td>{strosek.ime}</td>
                                <td>{strosek.znesek.toFixed(2)}</td>
                                <td>{strosek.kategorija}</td>
                                <td>{strosek.datum}</td>
                                <td>
                                    <Link to={`/uredi/${strosek.id}`} className="btn-edit">Uredi</Link>
                                    <button onClick={() => handleDelete(strosek.id)} className="btn-delete">Izbriši</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default StrosekList;