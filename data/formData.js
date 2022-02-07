export const formData = [
  {
    id: 1,
    name: 'starchyFoods',
    question: 'Tes féculents',
    label: 'Féculents',
    options: [
      {
        value: 'Pâtes', name: 'starchyFoods',
      },
      {
        value: 'Riz', name: 'starchyFoods',
      },
      {
        value: 'Pomme de terre', name: 'starchyFoods',
      },
      {
        value: 'Semoule', name: 'starchyFoods',
      },
      {
        value: 'Quinoa', name: 'starchyFoods',
      },
      {
        value: 'Farine', name: 'starchyFoods',
      },
    ],
    boolean: {
      name: 'hasStarchyFoods',
      text: 'Aucun, tristesse !'
    }
  },
  {
    id: 2,
    name: 'meat',
    question: 'Tes viandes',
    label: 'Viandes',
    options: [
      {
        value: 'Boeuf', name: 'meat',
      },
      {
        value: 'Steack haché', name: 'meat',
      },
      {
        value: 'Poulet', name: 'meat',
      },
      {
        value: 'Côtes de Porc', name: 'meat',
      },
      {
        value: 'Saucisse', name: 'meat',
      },
      {
        value: 'Knacki', name: 'meat',
      },
      {
        value: 'Lardons', name: 'meat',
      },
      {
        value: 'Jambon', name: 'meat',
      },
      {
        value: 'Veau', name: 'meat',
      },
    ],
    boolean: {
      name: 'hasMeat',
      text: 'Pas de viande'
    }
  },
  {
    id: 3,
    name: 'fish',
    question: 'Tes poissons',
    label: 'Poissons',
    options: [
      {
        value: 'Pavé de saumon', name: 'fish',
      },
      {
        value: 'Saumon fumé', name: 'fish',
      },
      {
        value: 'Poisson pané', name: 'fish',
      },
      {
        value: 'Cabillaud', name: 'fish',
      },
      {
        value: 'Lieu', name: 'fish',
      },
      {
        value: 'Sardines en boîte', name: 'fish',
      },
      {
        value: 'Pavé de thon rouge', name: 'fish',
      },
      {
        value: 'Thon en boîte', name: 'fish',
      },
      {
        value: 'Surimi', name: 'fish',
      },
      {
        value: 'Anchois', name: 'fish',
      },
    ],
    boolean: {
      name: 'hasFish',
      text: 'Pas de poisson'
    }
  },
  {
    id: 4,
    name: 'proteins',
    question: 'Tes protéines',
    label: 'Autres protéines',
    options: [
      {
        value: 'Tofu', name: 'proteins',
      },
      {
        value: 'Soja', name: 'proteins',
      },
      {
        value: 'Seitan', name: 'proteins',
      },
      {
        value: 'Oeuf', name: 'proteins',
      },
      {
        value: 'Pois chiche', name: 'proteins',
      },
      {
        value: 'Lentille', name: 'proteins',
      },
    ],
    boolean: {
      name: 'hasProteins',
      text: 'Rupture de stock'
    }
  },
  {
    id: 5,
    name: 'vegetables',
    question: 'Tes légumes',
    label: 'Légumes',
    options: [
      {
        value: 'Tomate', name: 'vegetables',
      },
      {
        value: 'Carotte', name: 'vegetables',
      },
      {
        value: 'Haricot vert', name: 'vegetables',
      },
      {
        value: 'Salade', name: 'vegetables',
      },
      {
        value: 'Champignons', name: 'vegetables',
      },
      {
        value: 'Courgette', name: 'vegetables',
      },
      {
        value: 'Concombre', name: 'vegetables',
      },
      {
        value: 'Oignon', name: 'vegetables',
      },
      {
        value: 'Avocat', name: 'vegetables',
      },
      {
        value: 'Poireau', name: 'vegetables',
      },
      {
        value: 'Poivron', name: 'vegetables',
      },
      {
        value: 'Brocoli', name: 'vegetables',
      },
      {
        value: 'Chou', name: 'vegetables',
      },
      {
        value: 'Aubergine', name: 'vegetables',
      },
    ],
    boolean: {
      name: 'hasVegetables',
      text: 'Si seulement !'
    }
  },
  {
    id: 6,
    name: 'dairy',
    question: 'Tes produits laitiers',
    label: 'Laitages',
    options: [
      {
        value: 'Crème fraiche', name: 'dairy',
      },
      {
        value: 'Lait', name: 'dairy',
      },
      {
        value: 'Fromage rapé', name: 'dairy',
      },
      {
        value: 'Parmesan', name: 'dairy',
      },
      {
        value: 'Camembert', name: 'dairy',
      },
      {
        value: 'Yaourt', name: 'dairy',
      },
    ],
    boolean: {
      name: 'hasDairy',
      text: 'Pas de produits laitiers'
    }
  },
  {
    id: 7,
    name: 'condiment',
    question: 'Tes condiments',
    label: 'Condiments',
    options: [
      {
        value: 'Moutarde', name: 'condiment',
      },
      {
        value: 'Mayonnaise', name: 'condiment',
      },
      {
        value: 'Ketchup', name: 'condiment',
      },
      {
        value: 'Sauce barbecue', name: 'condiment',
      },
      {
        value: 'Viandox', name: 'condiment',
      },
      {
        value: 'Tabasco', name: 'condiment',
      },
      {
        value: 'Sauce soja', name: 'condiment',
      },
    ],
    boolean: {
      name: 'hasCondiment',
      text: 'Pas de condiments'
    }
  },
  {
    id: 8,
    name: 'spices',
    question: 'Tes épices',
    label: 'Épices',
    options: [
        {
          value: 'Curry', name: 'spices',
        },
        {
          value: 'Cumin', name: 'spices',
        },
        {
          value: 'Curcuma', name: 'spices',
        },
        {
          value: 'Ail', name: 'spices',
        },
        {
          value: 'Paprika', name: 'spices',
        },
        {
          value: "Piment d'espelette", name: 'spices',
        },
        {
          value: 'Cannelle', name: 'spices',
        },
        {
          value: 'Muscade', name: 'spices',
        },
    ],
    boolean: {
      name: 'hasSpices',
      text: "J'ai pas d'épices"
    }
  },
  {
    id: 9,
    name: 'herbs',
    question: 'Tes herbes aromatiques',
    label: 'Herbes aromatiques',
    options: [
      {
        value: 'Herbes de Provence', name: 'herbs',
      },
      {
        value: 'Persil', name: 'herbs',
      },
      {
        value: 'Basilic', name: 'herbs',
      },
      {
        value: 'Ciboulette', name: 'herbs',
      },
      {
        value: 'Menthe', name: 'herbs',
      },
      {
        value: 'Aneth', name: 'herbs',
      },
      {
        value: 'Thym', name: 'herbs',
      },
      {
        value: 'Laurier', name: 'herbs',
      },
      {
        value: 'Coriandre', name: 'herbs',
      },
    ],
    boolean: {
      name: 'hasHerbs',
      text: 'Pas de ça en magasin'
    }
  },
]