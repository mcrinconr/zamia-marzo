import bcrypt from 'bcryptjs';

const data = {
  navbars: [
    {
      nombre: 'María',
    },
  ],
  users: [
    {
      name: 'Maria',
      email: 'mcrinconr@me.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
    },
    {
      name: 'Omar',
      email: 'mcrinconr@icloud.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
    }
  ],
  products: [
    {
      name: 'Crema aclarante',
      category: 'facial',
      image: '/images/p1.jpg',
      price: 45000,
      countInStock: 100,
      brand: 'zamia',
      rating: 4.9,
      numReviews: 298,
      description: 'Contiene ácido kójico'
    },
    {
      name: 'tratamiento antiacné',
      category: 'facial',
      image: '/images/p2.jpg',
      price: 45000,
      countInStock: 100,
      brand: 'zamia',
      rating: 4.8,
      numReviews: 87,
      description: 'Contiene ácido salicílico'
    },
    {
      name: 'Aclarante PRO',
      category: 'facial',
      image: '/images/p3.jpg',
      price: 65000,
      countInStock: 100,
      brand: 'zamia',
      rating: 5.0,
      numReviews: 67,
      description: 'Contiene ácido kójicoe hidroquinona'
    },
    {
      name: 'Crema antiedad',
      category: 'facial',
      image: '/images/p4.jpg',
      price: 65000,
      countInStock: 0,
      brand: 'zamia',
      rating: 4.7,
      numReviews: 36,
      description: 'Contiene ácido hialurónico'
    },
    {
      name: 'Tratamiento capilar',
      category: 'Capilar',
      image: '/images/p5.jpg',
      price: 65000,
      countInStock: 100,
      brand: 'zamia',
      rating: 4.5,
      numReviews: 54,
      description: 'Contiene ácido kójico'
    }
  ],
  highlights: [
    {
      title: 'Habla sobre tu empresa',
      text: 'Utiliza este espacio para resaltar un aspecto importante de tu empresa',
      image: 'https://assets.unenvironment.org/s3fs-public/2017-11/Forest_trees.jpg?null',
    }
  ],
  insights: [
    {
      title: 'Resalta un producto, blog o algo especial',
      text: 'Utiliza este espacio para describir que hace lo hace especial',
      image: 'https://assets.unenvironment.org/s3fs-public/2017-11/Forest_trees.jpg?null',
    }
  ],
  footers: [
    {
      nosotros: 'Nosotros',
      nosotrosParrafo: 'Empresa de productos naturales, científicamente comprobados, para el cuidado personal a través de la exótica Naturaleza Latina.',
      nosotrosLinea1: 'Marca Registrada®',
      nosotrosLinea2: 'Registro de Producción Invima',
      nosotrosLinea3: 'CP. AYC FM00707',
      enlaces: 'Enlaces',
      enlace1: 'Instagram',
      enlace2: 'Home Cleaner',
      social: 'Redes Sociales',
      social1: 'Facebook',
      social2: 'Instagram',
      copyright: 'Copyright Clicker © 2021. Todos los derechos reservados.'
    },
  ],
};
export default data;
