import { useState } from "react";
import { crearEjercicio } from "../utils/Peticiones";
import SelectorGrupos from "../components/Selectores/SelectorGrupos";
import toast from "react-hot-toast";

export default function AddExercise() {
    const [nombre, setNombre] = useState('');
    const [observaciones, setObservaciones] = useState('');
    const [foto, setFoto] = useState(null);
    const [musculos, setMusculos] = useState('');
    const [equipamiento, setEquipamiento] = useState('');
    const [grupo, setGrupo] = useState(''); // Añadir estado para el grupo

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('observaciones', observaciones);
        formData.append('foto', foto);
        formData.append('musculos', musculos);
        formData.append('equipamiento', equipamiento);
        formData.append('grupo', grupo); // Añadir grupo al formData

        crearEjercicio(formData)
            .then(response => {
                console.log("Ejercicio creado:", response);
                toast.success("Ejercicio creado")
            })
            .catch(error => {
                console.error("Error al crear el ejercicio:", error);
            });
    };

    const handleFileChange = (e) => {
        setFoto(e.target.files[0]);
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
            <h2>Crear Ejercicio</h2>
            <form action="api.php" onSubmit={handleSubmit} method="post" encType="multipart/form-data">
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="observaciones">Observaciones</label>
                    <textarea
                        id="observaciones"
                        value={observaciones}
                        onChange={(e) => setObservaciones(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="foto">Foto</label>
                    <input
                        type="file"
                        id="foto"
                        name="exercisePhoto"
                        onChange={handleFileChange}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="musculos">Músculos</label>
                    <input
                        type="text"
                        id="musculos"
                        value={musculos}
                        onChange={(e) => setMusculos(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="equipamiento">Equipamiento</label>
                    <input
                        type="text"
                        id="equipamiento"
                        value={equipamiento}
                        onChange={(e) => setEquipamiento(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <SelectorGrupos grupo={grupo} setGrupo={setGrupo} /> {/* Pasar grupo y setGrupo como props */}
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Crear Ejercicio
                </button>
            </form>
        </div>
    );
}
