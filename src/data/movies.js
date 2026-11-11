
const movies = [
    {
        id: 1,
        title: "Inception",
        year: 2010,
        releaseDate: "2010-07-16",
        rating: 8.8,
        genre: "Science Fiction",
        runtime: 148,
        overview: "A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea.",
        poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
        cast: [
            { name: "Leonardo DiCaprio", character: "Cobb" },
            { name: "Joseph Gordon-Levitt", character: "Arthur" },
            { name: "Elliot Page", character: "Ariadne" }
        ]
    },
    {
        id: 2,
        title: "Interstellar",
        year: 2014,
        releaseDate: "2014-11-07",
        rating: 8.7,
        genre: "Science Fiction",
        runtime: 169,
        overview: "A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.",
        poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
        cast: [
            { name: "Matthew McConaughey", character: "Cooper" },
            { name: "Anne Hathaway", character: "Brand" },
            { name: "Jessica Chastain", character: "Murph" }
        ]
    },
    {
        id: 3,
        title: "Joker",
        year: 2019,
        releaseDate: "2019-10-04",
        rating: 8.2,
        genre: "Drama",
        runtime: 122,
        overview: "A struggling comedian descends into madness and becomes the Joker.",
        poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg",
        cast: [
            { name: "Joaquin Phoenix", character: "Arthur Fleck" },
            { name: "Robert De Niro", character: "Murray Franklin" },
            { name: "Zazie Beetz", character: "Sophie" }
        ]
    },
    {
        id: 4,
        title: "Dune: Part Two",
        year: 2024,
        releaseDate: "2024-03-01",
        rating: 8.5,
        genre: "Action",
        runtime: 166,
        overview: "Paul Atreides unites with Chani and the Fremen while seeking revenge against those who destroyed his family.",
        poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
        cast: [
            { name: "Timothée Chalamet", character: "Paul Atreides" },
            { name: "Zendaya", character: "Chani" },
            { name: "Rebecca Ferguson", character: "Lady Jessica" }
        ]
    },
    {
        id: 5,
        title: "Oppenheimer",
        year: 2023,
        releaseDate: "2023-07-21",
        rating: 8.3,
        genre: "Drama",
        runtime: 180,
        overview: "The story of J. Robert Oppenheimer and his role in developing the atomic bomb.",
        poster: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
        cast: [
            { name: "Cillian Murphy", character: "J. Robert Oppenheimer" },
            { name: "Emily Blunt", character: "Katherine Oppenheimer" },
            { name: "Robert Downey Jr.", character: "Lewis Strauss" }
        ]
    },
    {
        id: 6,
        title: "Avatar: The Way of Water",
        year: 2022,
        releaseDate: "2022-12-16",
        rating: 7.6,
        genre: "Adventure",
        runtime: 192,
        overview: "Jake Sully and Neytiri protect their family on the beautiful world of Pandora.",
        poster: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
        cast: [
            { name: "Sam Worthington", character: "Jake Sully" },
            { name: "Zoe Saldaña", character: "Neytiri" },
            { name: "Sigourney Weaver", character: "Kiri" }
        ]
    },
    {
        id: 7,
        title: "Avengers: Endgame",
        year: 2019,
        releaseDate: "2019-04-26",
        rating: 8.3,
        genre: "Action",
        runtime: 181,
        overview: "The Avengers assemble once more to reverse the damage caused by Thanos.",
        poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
        cast: [
            { name: "Robert Downey Jr.", character: "Tony Stark" },
            { name: "Chris Evans", character: "Steve Rogers" },
            { name: "Chris Hemsworth", character: "Thor" }
        ]
    },
    {
        id: 8,
        title: "Spider-Man: No Way Home",
        year: 2021,
        releaseDate: "2021-12-17",
        rating: 8.0,
        genre: "Action",
        runtime: 148,
        overview: "Peter Parker asks Doctor Strange for help when his identity is revealed.",
        poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
        cast: [
            { name: "Tom Holland", character: "Peter Parker" },
            { name: "Zendaya", character: "MJ" },
            { name: "Benedict Cumberbatch", character: "Doctor Strange" }
        ]
    },
    {
        id: 9,
        title: "The Batman",
        year: 2022,
        releaseDate: "2022-03-04",
        rating: 7.8,
        genre: "Action",
        runtime: 176,
        overview: "Batman investigates corruption in Gotham while pursuing the Riddler.",
        poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
        cast: [
            { name: "Robert Pattinson", character: "Bruce Wayne" },
            { name: "Zoë Kravitz", character: "Selina Kyle" },
            { name: "Paul Dano", character: "The Riddler" }
        ]
    },
    {
        id: 10,
        title: "The Dark Knight",
        year: 2008,
        releaseDate: "2008-07-18",
        rating: 9.0,
        genre: "Action",
        runtime: 152,
        overview: "Batman faces the Joker, a criminal mastermind who wants to plunge Gotham City into chaos.",
        poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/hqkIcbrOHL86UncnHIsHVcVmzue.jpg",
        cast: [
            { name: "Christian Bale", character: "Bruce Wayne" },
            { name: "Heath Ledger", character: "Joker" },
            { name: "Aaron Eckhart", character: "Harvey Dent" }
        ]
    },
    {
        id: 11,
        title: "Titanic",
        year: 1997,
        releaseDate: "1997-12-19",
        rating: 7.9,
        genre: "Romance",
        runtime: 194,
        overview: "A young couple falls in love aboard the ill-fated Titanic.",
        poster: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/3h1JZGDhZ8nzxdgvkxha0qBqi05.jpg",
        cast: [
            { name: "Leonardo DiCaprio", character: "Jack Dawson" },
            { name: "Kate Winslet", character: "Rose DeWitt Bukater" },
            { name: "Billy Zane", character: "Cal Hockley" }
        ]
    },
    {
        id: 12,
        title: "Avatar",
        year: 2009,
        releaseDate: "2009-12-18",
        rating: 7.9,
        genre: "Adventure",
        runtime: 162,
        overview: "A marine travels to Pandora and becomes part of its native community.",
        poster: "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/vL5LR6WdxWPjLPFRLe133jXWsh5.jpg",
        cast: [
            { name: "Sam Worthington", character: "Jake Sully" },
            { name: "Zoe Saldaña", character: "Neytiri" },
            { name: "Sigourney Weaver", character: "Dr. Grace Augustine" }
        ]
    },
    {
        id: 13,
        title: "The Matrix",
        year: 1999,
        releaseDate: "1999-03-31",
        rating: 8.7,
        genre: "Science Fiction",
        runtime: 136,
        overview: "A computer hacker discovers the shocking truth about reality.",
        poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg",
        cast: [
            { name: "Keanu Reeves", character: "Neo" },
            { name: "Laurence Fishburne", character: "Morpheus" },
            { name: "Carrie-Anne Moss", character: "Trinity" }
        ]
    },
    {
        id: 14,
        title: "Gladiator",
        year: 2000,
        releaseDate: "2000-05-05",
        rating: 8.5,
        genre: "Action",
        runtime: 155,
        overview: "A betrayed Roman general fights his way through the gladiatorial arena.",
        poster: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/9g2Qq4X5V8s8b8u6.jpg",
        cast: [
            { name: "Russell Crowe", character: "Maximus" },
            { name: "Joaquin Phoenix", character: "Commodus" },
            { name: "Connie Nielsen", character: "Lucilla" }
        ]
    },
    {
        id: 15,
        title: "The Shawshank Redemption",
        year: 1994,
        releaseDate: "1994-09-23",
        rating: 9.3,
        genre: "Drama",
        runtime: 142,
        overview: "Two imprisoned men build a friendship over several years.",
        poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
        cast: [
            { name: "Tim Robbins", character: "Andy Dufresne" },
            { name: "Morgan Freeman", character: "Red" },
            { name: "Bob Gunton", character: "Warden Norton" }
        ]
    },
    {
        id: 16,
        title: "Pulp Fiction",
        year: 1994,
        releaseDate: "1994-10-14",
        rating: 8.5,
        genre: "Drama",
        runtime: 154,
        overview: "Interconnected crime stories unfold in Los Angeles.",
        poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
        cast: [
            { name: "John Travolta", character: "Vincent Vega" },
            { name: "Samuel L. Jackson", character: "Jules Winnfield" },
            { name: "Uma Thurman", character: "Mia Wallace" }
        ]
    },
    {
        id: 17,
        title: "Fight Club",
        year: 1999,
        releaseDate: "1999-10-15",
        rating: 8.8,
        genre: "Drama",
        runtime: 139,
        overview: "An office worker forms an underground fight club.",
        poster: "https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg",
        cast: [
            { name: "Brad Pitt", character: "Tyler Durden" },
            { name: "Edward Norton", character: "Narrator" },
            { name: "Helena Bonham Carter", character: "Marla Singer" }
        ]
    },
    {
        id: 18,
        title: "Forrest Gump",
        year: 1994,
        releaseDate: "1994-07-06",
        rating: 8.8,
        genre: "Drama",
        runtime: 142,
        overview: "A kind-hearted man experiences major moments in American history.",
        poster: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/qdIMHd4sEfJSckfVJfKQvisL02a.jpg",
        cast: [
            { name: "Tom Hanks", character: "Forrest Gump" },
            { name: "Robin Wright", character: "Jenny Curran" },
            { name: "Gary Sinise", character: "Lieutenant Dan" }
        ]
    },
    {
        id: 19,
        title: "The Lord of the Rings",
        year: 2001,
        releaseDate: "2001-12-19",
        rating: 8.9,
        genre: "Adventure",
        runtime: 178,
        overview: "A young hobbit begins a dangerous journey to destroy a powerful ring.",
        poster: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/vRQnzOn4HjIMX4LBq9nHhFXbsSu.jpg",
        cast: [
            { name: "Elijah Wood", character: "Frodo Baggins" },
            { name: "Ian McKellen", character: "Gandalf" },
            { name: "Viggo Mortensen", character: "Aragorn" }
        ]
    },
    {
        id: 20,
        title: "Jurassic Park",
        year: 1993,
        releaseDate: "1993-06-11",
        rating: 8.2,
        genre: "Adventure",
        runtime: 127,
        overview: "Scientists visit a theme park filled with genetically recreated dinosaurs.",
        poster: "https://image.tmdb.org/t/p/w500/b1xCNnyrPebIc7EWNZIa6jhb1Ww.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/9i3plLl89DHMz7mahksDaAo7HIS.jpg",
        cast: [
            { name: "Sam Neill", character: "Alan Grant" },
            { name: "Laura Dern", character: "Ellie Sattler" },
            { name: "Jeff Goldblum", character: "Ian Malcolm" }
        ]
    },

    {
        id: 21,
        title: "The Avengers",
        year: 2012,
        releaseDate: "2012-05-04",
        rating: 8.0,
        genre: "Action",
        runtime: 143,
        overview: "Earth's mightiest heroes join forces to stop an alien invasion.",
        poster: "https://placehold.co/500x750?text=The+Avengers",
        backdrop: "https://placehold.co/1280x720?text=The+Avengers",
        cast: [
            { name: "Robert Downey Jr.", character: "Tony Stark" },
            { name: "Chris Evans", character: "Steve Rogers" },
            { name: "Scarlett Johansson", character: "Natasha Romanoff" }
        ]
    },
    {
        id: 22,
        title: "Iron Man",
        year: 2008,
        releaseDate: "2008-05-02",
        rating: 7.9,
        genre: "Action",
        runtime: 126,
        overview: "A billionaire inventor builds a powerful armored suit and becomes a hero.",
        poster: "https://placehold.co/500x750?text=Iron+Man",
        backdrop: "https://placehold.co/1280x720?text=Iron+Man",
        cast: [
            { name: "Robert Downey Jr.", character: "Tony Stark" },
            { name: "Gwyneth Paltrow", character: "Pepper Potts" },
            { name: "Jeff Bridges", character: "Obadiah Stane" }
        ]
    },
    {
        id: 23,
        title: "Doctor Strange",
        year: 2016,
        releaseDate: "2016-11-04",
        rating: 7.5,
        genre: "Fantasy",
        runtime: 115,
        overview: "A surgeon discovers the mystical arts after a devastating accident.",
        poster: "https://placehold.co/500x750?text=Doctor+Strange",
        backdrop: "https://placehold.co/1280x720?text=Doctor+Strange",
        cast: [
            { name: "Benedict Cumberbatch", character: "Stephen Strange" },
            { name: "Chiwetel Ejiofor", character: "Mordo" },
            { name: "Rachel McAdams", character: "Christine Palmer" }
        ]
    },
    {
        id: 24,
        title: "Black Panther",
        year: 2018,
        releaseDate: "2018-02-16",
        rating: 7.3,
        genre: "Action",
        runtime: 134,
        overview: "T'Challa returns home to take his place as king of Wakanda.",
        poster: "https://placehold.co/500x750?text=Black+Panther",
        backdrop: "https://placehold.co/1280x720?text=Black+Panther",
        cast: [
            { name: "Chadwick Boseman", character: "T'Challa" },
            { name: "Michael B. Jordan", character: "Erik Killmonger" },
            { name: "Lupita Nyong'o", character: "Nakia" }
        ]
    },
    {
        id: 25,
        title: "Deadpool",
        year: 2016,
        releaseDate: "2016-02-12",
        rating: 8.0,
        genre: "Action",
        runtime: 108,
        overview: "A former special forces operative becomes a wisecracking antihero.",
        poster: "https://placehold.co/500x750?text=Deadpool",
        backdrop: "https://placehold.co/1280x720?text=Deadpool",
        cast: [
            { name: "Ryan Reynolds", character: "Wade Wilson" },
            { name: "Morena Baccarin", character: "Vanessa" },
            { name: "Ed Skrein", character: "Ajax" }
        ]
    },
    {
        id: 26,
        title: "John Wick",
        year: 2014,
        releaseDate: "2014-10-24",
        rating: 7.4,
        genre: "Action",
        runtime: 101,
        overview: "A retired assassin returns to the criminal underworld for revenge.",
        poster: "https://placehold.co/500x750?text=John+Wick",
        backdrop: "https://placehold.co/1280x720?text=John+Wick",
        cast: [
            { name: "Keanu Reeves", character: "John Wick" },
            { name: "Michael Nyqvist", character: "Viggo Tarasov" },
            { name: "Alfie Allen", character: "Iosef Tarasov" }
        ]
    },
    {
        id: 27,
        title: "Mad Max: Fury Road",
        year: 2015,
        releaseDate: "2015-05-15",
        rating: 8.1,
        genre: "Action",
        runtime: 120,
        overview: "Max joins Furiosa in a high-speed escape across a dangerous wasteland.",
        poster: "https://placehold.co/500x750?text=Mad+Max",
        backdrop: "https://placehold.co/1280x720?text=Mad+Max",
        cast: [
            { name: "Tom Hardy", character: "Max Rockatansky" },
            { name: "Charlize Theron", character: "Imperator Furiosa" },
            { name: "Nicholas Hoult", character: "Nux" }
        ]
    },
    {
        id: 28,
        title: "La La Land",
        year: 2016,
        releaseDate: "2016-12-09",
        rating: 8.0,
        genre: "Romance",
        runtime: 128,
        overview: "A musician and an aspiring actress fall in love while pursuing their dreams.",
        poster: "https://placehold.co/500x750?text=La+La+Land",
        backdrop: "https://placehold.co/1280x720?text=La+La+Land",
        cast: [
            { name: "Ryan Gosling", character: "Sebastian" },
            { name: "Emma Stone", character: "Mia" },
            { name: "John Legend", character: "Keith" }
        ]
    },
    {
        id: 29,
        title: "Whiplash",
        year: 2014,
        releaseDate: "2014-10-10",
        rating: 8.5,
        genre: "Drama",
        runtime: 107,
        overview: "A young drummer faces an intense music instructor determined to push him to greatness.",
        poster: "https://placehold.co/500x750?text=Whiplash",
        backdrop: "https://placehold.co/1280x720?text=Whiplash",
        cast: [
            { name: "Miles Teller", character: "Andrew Neiman" },
            { name: "J.K. Simmons", character: "Terence Fletcher" },
            { name: "Paul Reiser", character: "Jim Neiman" }
        ]
    },
    {
        id: 30,
        title: "The Wolf of Wall Street",
        year: 2013,
        releaseDate: "2013-12-25",
        rating: 8.2,
        genre: "Drama",
        runtime: 180,
        overview: "A stockbroker rises to wealth through corruption and excessive ambition.",
        poster: "https://placehold.co/500x750?text=Wolf+of+Wall+Street",
        backdrop: "https://placehold.co/1280x720?text=Wolf+of+Wall+Street",
        cast: [
            { name: "Leonardo DiCaprio", character: "Jordan Belfort" },
            { name: "Jonah Hill", character: "Donnie Azoff" },
            { name: "Margot Robbie", character: "Naomi Lapaglia" }
        ]
    },
    {
        id: 31,
        title: "Shutter Island",
        year: 2010,
        releaseDate: "2010-02-19",
        rating: 8.2,
        genre: "Thriller",
        runtime: 138,
        overview: "Two US marshals investigate the disappearance of a patient from an island hospital.",
        poster: "https://placehold.co/500x750?text=Shutter+Island",
        backdrop: "https://placehold.co/1280x720?text=Shutter+Island",
        cast: [
            { name: "Leonardo DiCaprio", character: "Teddy Daniels" },
            { name: "Mark Ruffalo", character: "Chuck Aule" },
            { name: "Ben Kingsley", character: "Dr. Cawley" }
        ]
    },
    {
        id: 32,
        title: "The Prestige",
        year: 2006,
        releaseDate: "2006-10-20",
        rating: 8.5,
        genre: "Drama",
        runtime: 130,
        overview: "Two rival magicians compete to create the ultimate stage illusion.",
        poster: "https://placehold.co/500x750?text=The+Prestige",
        backdrop: "https://placehold.co/1280x720?text=The+Prestige",
        cast: [
            { name: "Christian Bale", character: "Alfred Borden" },
            { name: "Hugh Jackman", character: "Robert Angier" },
            { name: "Scarlett Johansson", character: "Olivia Wenscombe" }
        ]
    },
    {
        id: 33,
        title: "The Social Network",
        year: 2010,
        releaseDate: "2010-10-01",
        rating: 7.8,
        genre: "Drama",
        runtime: 120,
        overview: "The story of the creation of Facebook and the conflicts surrounding it.",
        poster: "https://placehold.co/500x750?text=Social+Network",
        backdrop: "https://placehold.co/1280x720?text=Social+Network",
        cast: [
            { name: "Jesse Eisenberg", character: "Mark Zuckerberg" },
            { name: "Andrew Garfield", character: "Eduardo Saverin" },
            { name: "Justin Timberlake", character: "Sean Parker" }
        ]
    },
    {
        id: 34,
        title: "Get Out",
        year: 2017,
        releaseDate: "2017-02-24",
        rating: 7.8,
        genre: "Horror",
        runtime: 104,
        overview: "A young man visits his girlfriend's family and uncovers a disturbing secret.",
        poster: "https://placehold.co/500x750?text=Get+Out",
        backdrop: "https://placehold.co/1280x720?text=Get+Out",
        cast: [
            { name: "Daniel Kaluuya", character: "Chris Washington" },
            { name: "Allison Williams", character: "Rose Armitage" },
            { name: "Bradley Whitford", character: "Dean Armitage" }
        ]
    },
    {
        id: 35,
        title: "A Quiet Place",
        year: 2018,
        releaseDate: "2018-04-06",
        rating: 7.5,
        genre: "Horror",
        runtime: 90,
        overview: "A family struggles to survive in a world inhabited by creatures that hunt by sound.",
        poster: "https://placehold.co/500x750?text=Quiet+Place",
        backdrop: "https://placehold.co/1280x720?text=Quiet+Place",
        cast: [
            { name: "Emily Blunt", character: "Evelyn Abbott" },
            { name: "John Krasinski", character: "Lee Abbott" },
            { name: "Millicent Simmonds", character: "Regan Abbott" }
        ]
    },
    {
        id: 36,
        title: "Coco",
        year: 2017,
        releaseDate: "2017-11-22",
        rating: 8.4,
        genre: "Adventure",
        runtime: 105,
        overview: "A young musician enters the Land of the Dead to discover his family's history.",
        poster: "https://placehold.co/500x750?text=Coco",
        backdrop: "https://placehold.co/1280x720?text=Coco",
        cast: [
            { name: "Anthony Gonzalez", character: "Miguel" },
            { name: "Gael García Bernal", character: "Héctor" },
            { name: "Benjamin Bratt", character: "Ernesto de la Cruz" }
        ]
    },
    {
        id: 37,
        title: "Inside Out",
        year: 2015,
        releaseDate: "2015-06-19",
        rating: 8.1,
        genre: "Comedy",
        runtime: 95,
        overview: "A young girl's emotions guide her through a major life change.",
        poster: "https://placehold.co/500x750?text=Inside+Out",
        backdrop: "https://placehold.co/1280x720?text=Inside+Out",
        cast: [
            { name: "Amy Poehler", character: "Joy" },
            { name: "Phyllis Smith", character: "Sadness" },
            { name: "Bill Hader", character: "Fear" }
        ]
    },
    {
        id: 38,
        title: "Finding Nemo",
        year: 2003,
        releaseDate: "2003-05-30",
        rating: 8.2,
        genre: "Adventure",
        runtime: 100,
        overview: "A clownfish travels across the ocean to find his missing son.",
        poster: "https://placehold.co/500x750?text=Finding+Nemo",
        backdrop: "https://placehold.co/1280x720?text=Finding+Nemo",
        cast: [
            { name: "Albert Brooks", character: "Marlin" },
            { name: "Ellen DeGeneres", character: "Dory" },
            { name: "Alexander Gould", character: "Nemo" }
        ]
    },
    {
        id: 39,
        title: "The Grand Budapest Hotel",
        year: 2014,
        releaseDate: "2014-03-28",
        rating: 8.1,
        genre: "Comedy",
        runtime: 99,
        overview: "A hotel concierge and his lobby boy become involved in a stolen painting mystery.",
        poster: "https://placehold.co/500x750?text=Grand+Budapest",
        backdrop: "https://placehold.co/1280x720?text=Grand+Budapest",
        cast: [
            { name: "Ralph Fiennes", character: "M. Gustave" },
            { name: "Tony Revolori", character: "Zero" },
            { name: "Saoirse Ronan", character: "Agatha" }
        ]
    },
    {
        id: 40,
        title: "Django Unchained",
        year: 2012,
        releaseDate: "2012-12-25",
        rating: 8.5,
        genre: "Drama",
        runtime: 165,
        overview: "A freed slave teams up with a bounty hunter to rescue his wife.",
        poster: "https://placehold.co/500x750?text=Django",
        backdrop: "https://placehold.co/1280x720?text=Django",
        cast: [
            { name: "Jamie Foxx", character: "Django" },
            { name: "Christoph Waltz", character: "Dr. King Schultz" },
            { name: "Leonardo DiCaprio", character: "Calvin Candie" }
        ]
    }
];

export const trendingMovies = movies.slice(0, 10);
export const popularMovies = movies.slice(10, 20);

export const topRatedMovies = [...movies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

export const upcomingMovies = movies.slice(30, 40);
