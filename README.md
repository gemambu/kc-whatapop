# Whatapop. Práctica Angular Boot V

**Nota:** El enunciado de la práctica se ha movido al fichero _enunciado.md_.

## Paths Obligatorios:

### Green Path: Detalles de un producto

En este path he conectado el componente del listado con el componente del detalle de producto. Como añadido (más información en el Apartado de Extras), al hacer click desde la imagen también se accede al detalle del producto.

### Blue Path: Apañando la fecha de publicación

En este path con la ayuda de la librería [Moment.js](http://momentjs.com/) se indica el tiempo que ha transcurrido desde que se publicó el producto. Formato: _Publicado: hace N años_

### Pink Path: Ordenando los productos

Path donde se ha completado la ordenación por fecha de publicación descendente (los más nuevos primero). Más adelante (Paths optativos y Extras) se detallan más opciones de ordenado.

### Red Path: Filtrando productos

Path donde se ha completado la búsqueda por un texto cualquiera y/o categoría. Más adelante (Paths optativos y Extras) se detallan más opciones de filtrado.


### Yellow Path: Reseteando productos

Se completa la funcionalidad para desarrollo de reseteado de productos. Bastaba con comunicar el componente de colección de productos y el servicio de reset de productos. Más adelante (Extras) se detalla más información acerca de este Path.

### Purple Path: Mejorando el formato de los precios

Para resolver este path, me he decantado por el Pipe number, asumiendo que tanto en la vista de listado como en el detalle el precio se debe mostrar con dos decimales.


## Paths Opcionales:

### Broken White Path (AKA Blanco Roto): Likes

He gestionado los likes con _localStorage_. Para ello, he generado la clave _starProducts_ que se almacena con un array que contiene los identificadores de los productos marcados como favoritos.

Para ello, he creado el servicio _ProductsAuxiliarService_, que se encarga de consultar y manejar la lista de favoritos. Este servicio se consulta desde el componente de detalle de producto y desde el componente de colección de productos (esta segunda parte es un extra añadido, más información en el apartado Extras).


### Red Wine Path (AKA Vino Tinto): Filtro y ordenación avanzada

Se ha completado el filtrado de productos por los siguientes campos:

- Nombre
- Descripción
- Categoría
- Estado (vendido / en venta)
- Precio mínimo
- Precio máximo
- Fecha de publicación
- Nick de usuario

Además se ha añadido la opción de ordenar por:

- Fecha de publicación
- Nombre

De forma Ascendente o Descendete.
Esta ordenación se hace de forma automática en cuanto se elige una de las opciones (esta funcionalidad es independiente del filtrado, pero también se tiene en cuenta a la hora de obtener productos filtrados).


### Brick Red Path (AKA Teja): Productos por vendedor

Para este path Teja (AKA _el padre de todos los paths_), he optado por reutilizar los componentes que ya existían en el proyecto.

Por un lado, el componente de perfil de usuario y por otro lado, el componente de la colección de productos (filtrada por usuario). Además se ha ocultado el componente de filtrado, ya que en esta pantalla no era necesario.

## Extras:

### Más campos de filtrado

En el enunciado sólo se solicitaba el filtrado por texto (en general), categoría, estado del producto (en venta/vendido) y rango de precio. 

Se han añadido más campos de filtrado:
Se hace diferencia entre filtro por nombre de producto y descripción, así como por fecha de publicación y usuario.

Como se ha explicado en el path Vino Tinto, se ha añadido la funcionalidad de ordenación por fecha de publicación o nombre de producto y de forma ascendente o descendente. Esta ordenación puede realizarse de forma independiente al filtrado.

### Botón limpiar filtro

Todo botón de _Buscar_ debe ir acompañado de un botón _Limpiar filtro_. Este botón desencadena los siguientes procesos:

- Establece por defecto la ordenación por nombre de producto ascendente.
- Limpia los campos filtrados, dejando un filtro vacío.
- Almacena esta información como último filtro aplicado.
- Ejecuta la búsqueda de productos con este filtro reseteado.

### Manejo de favoritos desde el listado

Se ha añadido la funcionalidad de visualizar los productos favoritos desde el listado. Además, al pinchar sobre la estrella se puede añadir/quitar el producto del listado de favoritos. Ya no es necesario acceder al detalle de un producto para saber si está incluido o no en el listado de favoritos.

### Acceso a detalle de producto al pinchar sobre la imagen

Para ver el detalle de un producto no es necesario darle al botón de Comprar/Ver detalles. Ahora, al pinchar sobre la imagen automáticamente navegamos al detalle del producto.

### Almacenamiento del último filtro aplicado

Tal y como se ha detallado más arriba, cuando se hace una búsqueda de productos, se almacena con localStorage (clave _lastFilter_) la información del último filtro aplicado. Esta funcionalidad es útil si se navega a un detalle de producto / usuario, retornar el mismo filtrado de productos al volver a la pantalla de listado.

### Botón 'volver' en todas las páginas visitadas

Para hacer una navegación más cómoda se ha añadido el botón de _Volver_ en todas las páginas que se pueden visitar.


## Nota

Agradecer a nuestro sufrido profesor [Vermicida](https://github.com/vermicida) su paciencia, explicaciones e interés por ayudarnos cuando sea y como sea. Te debo el 9.99% de la práctica de Angular! Nos lo has puesto difícil con eso de no poder sobornarte con jamón :D!