import { SimpleGrid, Card, Image, Text, Badge, Button, Group } from '@mantine/core';

function AnimeList({ animes, onEdit, onDelete }) {
  
  if (animes.length === 0) {
    return <Text align="center" color="dimmed" mt="xl" size="lg">No hay animes en la biblioteca aún.</Text>;
  }

  return (
    <SimpleGrid cols={3} spacing="xl" breakpoints={[{ maxWidth:'sm',cols: 1}]}>
      
      {animes.map((anime)=>(
        <Card 
            key={anime.id} 
            shadow="sm" 
            padding="lg" 
            radius="md" 
            withBorder 
            className="anime-card"
        >
          <Card.Section>
            <Image
              src={anime.imagen_url}
              height={200} 
              alt={anime.titulo}
              fit="cover" 
              withPlaceholder
            />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text weight={700} size="lg" style={{ lineHeight: 1.2, color: '#fff' }} lineClamp={1}>
                {anime.titulo}
            </Text>
            <Badge color={anime.estado === 'Terminado' ? 'green' : anime.estado === 'Viendo' ? 'blue' : 'gray'} variant="light">
              {anime.estado}
            </Badge>
          </Group>

          <Text size="sm" color="dimmed">
            Episodios: {anime.episodios}
          </Text>

          <Text size="sm" color="dimmed" mb="md">
             Categoría: <b style={{ color: '#E0E0E0' }}>{anime.categoria ? anime.categoria.nombre : 'Sin Categoría'}</b>
          </Text>

          <Group grow>
            <Button variant="light" color="blue" onClick={() => onEdit(anime)}>
              Editar
            </Button>
            <Button variant="light" color="red" onClick={() => onDelete(anime.id)}>
              Eliminar
            </Button>
          </Group>
        </Card>
      ))}
    </SimpleGrid>
  );
}

export default AnimeList;