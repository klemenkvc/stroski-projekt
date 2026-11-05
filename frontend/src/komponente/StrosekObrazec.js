import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StrosekServis from '../servis/StrosekServis';

const StrosekObrazec = () => {
    const [ime, setIme] = useState('');
    const [znesek, setZnesek] = useState('');
    const [kategorija, setKategorija] = useState('');
    const [datum, setDatum] = useState('');
    
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchStrosek = async () => {
                try {
                    const response = await StrosekServis.getStrosekById(id);
                    setIme(response.data.ime);
                    setZnesek(response.data.znesek);
                    setKategorija(response.data.kategorija);
                    setDatum(response.data.datum);
                } catch (error) {
                    console.error("Napaka pri pridobivanju stroška:", error);
                }
            };
            fetchStrosek();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const strosek = { ime, znesek: parseFloat(znesek), kategorija, datum };
        try {
            if (id) {
                await StrosekServis.updateStrosek(id, strosek);
            } else {
                await StrosekServis.createStrosek(strosek);
            }
            navigate('/');
        } catch (error) {
            console.error("Napaka pri shranjevanju stroška:", error);
        }
    };

    return (
        <div>
            <h2>{id ? 'Uredi strošek' : 'Dodaj nov strošek'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Ime:</label>
                    <input type="text" value={ime} onChange={(e) => setIme(e.target.value)} required placeholder="npr. Kosilo" />
                </div>
                <div>
                    <label>Znesek (€):</label>
                    <input type="number" step="0.01" value={znesek} onChange={(e) => setZnesek(e.target.value)} required placeholder="npr. 12.50" />
                </div>
                <div>
                    <label>Kategorija:</label>
                    <input type="text" value={kategorija} onChange={(e) => setKategorija(e.target.value)} required placeholder="npr. Hrana" />
                </div>
                <div>
                    <label>Datum:</label>
                    <input type="date" value={datum} onChange={(e) => setDatum(e.target.value)} required />
                </div>
                <button type="submit">Shrani</button>
            </form>
        </div>
    );
};

export default StrosekObrazec;