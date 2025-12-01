import { useState, useEffect } from 'react';
import { TextInput, NumberInput, Select, Button, Group, Stack } from '@mantine/core';

function Anime({onSubmit, initialData, categorias, onCancel}){
  const [form, setForm] = useState({
    titulo: '',
    imagen_url: '',
    episodios: 0,
    estado: '',
    categoria_id: ''
  });

  useEffect(()=> {
    if (initialData) {
      setForm({
        titulo: initialData.titulo,
        imagen_url: initialData.imagen_url,
        episodios: initialData.episodios,
        estado: initialData.estado,
        categoria_id: String(initialData.categoria_id)
      });
    } else {
      setForm({ titulo: '', imagen_url: '', episodios: 0, estado: '', categoria_id: '' });
    }
  },[initialData]);

  const handleSubmit=(e)=>{
    e.preventDefault();
    const dataToSend= initialData?{ ...form, id: initialData.id}: form;
    onSubmit(dataToSend);
  };

  const opcionesCategorias= categorias.map(c =>({
    value: String(c.id),
    label: c.nombre
  }));

  return (
      <form onSubmit={handleSubmit}>
        <Stack spacing="sm">
          <TextInput
            label="Título"
            placeholder="Ej: Naruto"
            required
            data-autofocus 
            value={form.titulo}
            onChange={(e)=> setForm({ ...form, titulo: e.target.value })}
          />

          <TextInput
            label="URL de Imagen"
            placeholder="https://..."
            required
            value={form.imagen_url}
            onChange={(e)=> setForm({ ...form, imagen_url: e.target.value })}
          />

          <Group grow>
            <NumberInput
              label="Episodios"
              placeholder="0"
              required
              min={0}
              value={form.episodios}
              onChange={(val)=> setForm({ ...form, episodios: val })}
            />

            <Select
              label="Estado"
              placeholder="Selecciona..."
              data={['Viendo', 'Terminado', 'Pendiente']}
              required
              value={form.estado}
              onChange={(val)=> setForm({ ...form, estado: val })}
            />
          </Group>

          <Select
            label="Categoría"
            placeholder="Selecciona una categoría"
            data={opcionesCategorias}
            required
            value={form.categoria_id}
            onChange={(val) =>setForm({ ...form, categoria_id: val })}
          />

          <Group position="right" mt="md">
            <Button variant="default" onClick={onCancel}>
                Cancelar
            </Button>
            <Button type="submit" color={initialData?'orange': 'blue'}>
                {initialData?'Actualizar': 'Guardar'}
            </Button>
          </Group>
        </Stack>
      </form>
  );
}

export default Anime;