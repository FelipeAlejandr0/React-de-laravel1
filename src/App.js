import { useState, useEffect } from 'react';
import AnimeList from './Componentes/AnimeList.js';
import Anime from './Componentes/Anime.js';
import { Container, Title, LoadingOverlay, Modal, Button, Group } from '@mantine/core';
import './App.css';

function App() {
  const [animes,setAnimes] = useState([]);
  const [categorias,setCategorias] = useState([]);
  const [editingAnime, setEditingAnime] =useState(null);
  const [cargando,setCargando] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  const API_URL= "https://laravel-1-production.up.railway.app";

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos=async() => {
    setCargando(true);
    try {
        const respCat= await fetch(`${API_URL}/categorias`);
        const dataCat= await respCat.json();
        setCategorias(dataCat);

        const respAnime= await fetch(`${API_URL}/animes`);
        const dataAnime = await respAnime.json();
        setAnimes(dataAnime);} catch (error) {
        console.error("Error backend:", error);} finally{
        setCargando(false);
    }
  };

  const abrirModalNuevo= () => {
    setEditingAnime(null);
    setModalAbierto(true);
  };

  const handleEdit =(anime) =>{
    setEditingAnime(anime);
    setModalAbierto(true);
  };

  const cerrarModal = ()=>{
    setModalAbierto(false);
    setEditingAnime(null);
  };

  const handleAdd= async(nuevoAnime)=>{
    setCargando(true);
    try {
        const response= await fetch(`${API_URL}/animes`,{
            method:'POST',
            headers: { 'Content-Type':'application/json','Accept':'application/json'},
            body: JSON.stringify(nuevoAnime)
        });

        if (response.ok){
            const data= await response.json();
            setAnimes([...animes, data.data]);
            cerrarModal(); 
            alert("Anime guardado exitosamente");
        } else {
            alert("Error al guardar");
        }
    } catch (error){
        console.error(error);
    } finally{
        setCargando(false);
    }
  };

  const handleUpdate= async(animeEditado)=>{
    setCargando(true);
    try{
        const response = await fetch(`${API_URL}/animes/${animeEditado.id}`,{
            method:'PUT',
            headers:{'Content-Type':'application/json','Accept':'application/json'},
            body: JSON.stringify(animeEditado)
        });

        if (response.ok){
            const data = await response.json();
            const listaActualizada= animes.map(a=>a.id === animeEditado.id? data.data :a);
            setAnimes(listaActualizada);
            cerrarModal(); 
            alert("Anime actualizado");
        } else {
            alert("Error al actualizar");
        }
    } catch (error){
        console.error(error);
    } finally{
        setCargando(false);
    }
  };

  const handleDelete= async(id)=>{
      if(!window.confirm("quieres eliminar este anime?")) return;
      try {
          await fetch(`${API_URL}/animes/${id}`,{ method:'DELETE'});
          setAnimes(animes.filter(a => a.id !==id));} catch (error){ console.error(error);}
  };

  return (
    <Container pos="relative" size="lg" py="xl">
      <LoadingOverlay visible={cargando} overlayProps={{radius:"sm", blur: 2}}/>
      
      <div style={{ marginBottom:'30px'}}>
        <Title order={1} align="center" className="main-title" style={{ marginBottom:'15px'}}>
            Biblioteca de Anime
        </Title>

        <Group position="right">
            <Button 
                onClick={abrirModalNuevo} 
                size="md" 
                radius="md" 
                color="blue"
                className="btn-agregar">+ Agregar Anime
            </Button>
        </Group>
      </div>

      <Modal 
        opened={modalAbierto} 
        onClose={cerrarModal}
        title={editingAnime?"Editar Anime":" Nuevo Anime"}
        centered
      >
         <Anime
            onSubmit={editingAnime ?handleUpdate:handleAdd}
            initialData={editingAnime}
            categorias={categorias}
            onCancel={cerrarModal}
          />
      </Modal>

      <AnimeList
        animes={animes}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Container>
  );
}

export default App;