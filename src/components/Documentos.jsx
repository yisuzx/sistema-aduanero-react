import React, { useState, useEffect } from 'react';
import documentosService from '../services/documentosService';

const Documentos = () => {
    const [documentos, setDocumentos] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showUpload, setShowUpload] = useState(false);
    const [uploadFile, setUploadFile] = useState(null);
    const [descripcion, setDescripcion] = useState('');
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        fetchDocumentos();
    }, []);

    const fetchDocumentos = async () => {
        try {
            const data = await documentosService.getDocumentos();
            setDocumentos(data);
        } catch (error) {
            console.error('Error cargando documentos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        setUploadFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!uploadFile) {
            setMensaje("Por favor seleccione un archivo.");
            return;
        }

        const formData = new FormData();
        formData.append('file', uploadFile);
        formData.append('descripcion', descripcion);

        try {
            setLoading(true);
            await documentosService.uploadDocumento(formData);
            setMensaje("¡Documento subido exitosamente!");
            setUploadFile(null);
            setDescripcion('');
            setShowUpload(false);
            fetchDocumentos(); 
        } catch (error) {
            setMensaje("Error al subir: " + error);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !documentos.length) return <div className="text-center mt-5">Cargando documentos...</div>;

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title text-primary">Gestión de Documentos</h1>
            <p className="dashboard-subtitle">Archivos y certificaciones de tus trámites aduaneros.</p>

            {}
            <div className="mt-4 mb-4">
                <button 
                    className="btn btn-primary"
                    onClick={() => setShowUpload(!showUpload)}
                >
                    {showUpload ? 'Cancelar Subida' : '+ Subir Nuevo Documento'}
                </button>
            </div>

            {}
            {showUpload && (
                <div className="card shadow-sm mb-4 p-4 border-primary">
                    <h5 className="mb-3">Adjuntar Documento</h5>
                    <form onSubmit={handleUpload}>
                        <div className="mb-3">
                            <label className="form-label">Archivo</label>
                            <input type="file" className="form-control" onChange={handleFileChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Descripción / Tipo</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Ej: Factura Comercial, Certificado..." 
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                required 
                            />
                        </div>
                        <button type="submit" className="btn btn-success" disabled={loading}>
                            {loading ? 'Subiendo...' : 'Confirmar Subida'}
                        </button>
                    </form>
                    {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
                </div>
            )}

            {}
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documentos.length > 0 ? documentos.map((doc, index) => (
                            <tr key={doc.id || index}>
                                <td>{doc.nombre || doc.filename}</td>
                                <td>{doc.tipo || doc.descripcion}</td>
                                <td>
                                    <span className={`badge ${
                                        doc.estado === 'APROBADO' ? 'bg-success' :
                                        doc.estado === 'PENDIENTE' ? 'bg-warning text-dark' : 'bg-secondary'
                                    }`}>
                                        {doc.estado || 'Recibido'}
                                    </span>
                                </td>
                                <td>{doc.fechaCarga ? new Date(doc.fechaCarga).toLocaleDateString() : 'Hoy'}</td>
                                <td>
                                    <button className="btn btn-sm btn-outline-secondary">Descargar</button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="5" className="text-center">No hay documentos registrados.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Documentos;