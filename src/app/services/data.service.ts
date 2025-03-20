import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project, Images, Mockups, Screenshots } from '../interfaces/project.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly projectsSubject = new BehaviorSubject<Project[]>([]);
  private readonly imagesSubject = new BehaviorSubject<Images>({} as Images);
  private readonly mockupsSubject = new BehaviorSubject<Mockups>({} as Mockups);
  private readonly screenshotsSubject = new BehaviorSubject<Screenshots>({} as Screenshots);

  // Expose the observables
  readonly projects$ = this.projectsSubject.asObservable();
  readonly images$ = this.imagesSubject.asObservable();
  readonly mockups$ = this.mockupsSubject.asObservable();
  readonly screenshots$ = this.screenshotsSubject.asObservable();

  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    // Import images
    import('../../assets/images').then(({ Images, Mockups, Screenshots }) => {
      this.imagesSubject.next(Images);
      this.mockupsSubject.next(Mockups);
      this.screenshotsSubject.next(Screenshots);

      // Initialize projects with imported images
      const projects: Project[] = [
        {
          id: "job-tracker",
          featured: false,
          date: 2022,
          title: "Job Tracker",
          subtitle: "Job Hunting Made Easy",
          description: "Introducing Job Tracker, a seamless web and Chrome extension application revolutionizing your job application process. Accessible worldwide, on any device, its intuitive interface simplifies data entry, offering one-click Chrome extension integration. Effortlessly search, save, and update job applications, complemented by insightful statistics. Capture application nuances with a Kanban board and export data as PDF or Excel. Job Tracker: Elevate your job search, streamline your progress, and embrace efficiency.",
          client: "Personal Project",
          role: "Full Stack Developer",
          involvement: "I was in charge of the development of the web application and the Google Chrome extension. I was responsible for the development of the backend and the database as well as the development of the frontend.",
          fullStack: {
            frontend: [
              "React",
              "TypeScript",
              "Vite",
              "Redux",
              "FontAwesome",
              "Axios",
              "d3",
              "Formik",
              "Yup",
              "JS Cookie",
              "React Beautiful DnD",
              "React Toastify",
              "Chakra UI",
              "Vite Plugin PWA",
              "React router dom",
              "React Spinners"
            ],
            backend: [
              "bcryptjs",
              "body-parser",
              "dotenv",
              "exceljs",
              "express",
              "express-rate-limit",
              "helmet",
              "jsonwebtoken",
              "moment",
              "pdfkit",
              "pdfkit-table",
              "sequelize"
            ],
            database: [
              "mysql",
              "mysql2"
            ],
            extension: [
              "React",
              "TypeScript",
              "Vite",
              "FontAwesome",
              "Axios",
              "react-spinners",
              "react-toastify",
              "redux",
              "luxon"
            ]
          },
          tags: ['React', 'TypeScript', 'Node.js', 'Express', 'MySQL', 'Google Chrome Extension'],
          screenshot: Screenshots.JobTrackerScreenshot,
          mockups: [Images.JobTrackerLogo, Mockups.JobTrackerMockup1, Mockups.JobTrackerMockup2, Mockups.JobTrackerMockup3],
          website: "https://job-tracker.jerome-baille.fr",
          github: {
            frontend: "https://github.com/Jerome-Baille/job-visualiser",
            backend: "",
            extension: "https://github.com/Jerome-Baille/job-tracker-extension"
          }
        },
        {
          id: "pantry-pal",
          featured: true,
          date: 2023,
          title: "PantryPal",
          subtitle: "Your Personal Recipe Book",
          description: "Meet Pantry Pal, the web application transforming your culinary experience. Unite your favorite recipes in one accessible hub, sharing gastronomic delights with friends and family. Securely access your collection from any device, exploring recipes through intuitive filters. Craft delicious meals effortlessly using pantry ingredients. Elevate your cooking with a responsive app, enabling you to create an account and curate a dynamic shopping list directly from chosen recipes. Experience the joy of cooking with Pantry Pal – simplicity, accessibility, and flavor in one delightful package.",
          client: "Individual Project",
          role: "Full Stack Developer",
          involvement: "I was in charge of the development of the web application. I was responsible for the development of the backend and the database as well as the development of the frontend.",
          fullStack: {
            frontend: [
              "Angular",
              "TypeScript",
              "RxJS",
              "FontAwesome",
              "PdfMake",
              "Mat Angular"
            ],
            backend: [
              "bcryptjs",
              "body-parser",
              "dotenv",
              "express",
              "express-rate-limit",
              "helmet",
              "jsonwebtoken",
              "password-validator",
              "pdfkit",
              "sequelize",
              "swagger"
            ],
            database: [
              "mysql",
              "mysql2"
            ],
            extension: []
          },
          tags: ['Angular', 'TypeScript', 'Node.js', 'Express', 'MySQL'],
          screenshot: Screenshots.PantryPalScreenshot,
          mockups: [Images.PantryPalLogo, Mockups.PantryPalMockup1, Mockups.PantryPalMockup2, Mockups.PantryPalMockup3],
          website: "https://pantry-pal.jerome-baille.fr",
          github: {
            frontend: "https://github.com/Jerome-Baille/PantryPal-frontend",
            backend: "",
            extension: ""
          }
        },
        {
          id: "flick-pick",
          featured: true,
          date: 2023,
          title: "FlickPick",
          subtitle: "Choose, Watch, Enjoy",
          description: "Discover Flick Pick, your go-to movie decision companion. This web app streamlines film choices, allowing you to search, add to your watchlist, and invite friends to vote. Seamlessly access your cinematic universe from any device. Create an account for a personalized experience, exploring movies with ease. Flick Pick transforms movie nights with a social twist—invite friends, vote together, and turn choosing a film into a lively group activity. Elevate your movie-watching experience with Flick Pick, where every decision becomes a shared celebration.",
          client: "Individual Project",
          role: "Full Stack Developer",
          involvement: "I was in charge of the development of the web application. I was responsible for the development of the backend and the database as well as the development of the frontend.",
          fullStack: {
            frontend: [
              "Angular",
              "TypeScript",
              "RxJS",
              "FontAwesome",
              "Mat Angular"
            ],
            backend: [
              "bcryptjs",
              "body-parser",
              "dotenv",
              "express",
              "express-rate-limit",
              "helmet",
              "jsonwebtoken",
              "password-validator",
              "sequelize",
              "swagger"
            ],
            database: [
              "mysql",
              "mysql2"
            ],
            extension: []
          },
          tags: ['Angular', 'TypeScript', 'Node.js', 'Express', 'MySQL'],
          screenshot: Screenshots.FlickPickScreenshot,
          mockups: [Images.FlickPickLogo, Mockups.FlickPickMockup1, Mockups.FlickPickMockup2],
          website: "https://flick-pick.jerome-baille.fr",
          github: {
            frontend: "https://github.com/Jerome-Baille/FlickPick-frontend",
            backend: "",
            extension: ""
          }
        },
        {
          id: "game-verse",
          featured: true,
          date: 2023,
          title: "GameVerse",
          subtitle: "Different Platforms, One Application",
          description: "Welcome to Game Verse, your ultimate gaming companion. This web app and Chrome extension redefine game management, consolidating all your owned games in one accessible hub. Securely access your gaming haven from any device with our responsive app. Effortlessly save and organize your games, either manually or through the Chrome extension. Navigate your collection seamlessly using intuitive search filters. Game Verse enriches your gaming journey, providing comprehensive game details. Elevate your gaming experience—simplify, organize, and enjoy your personalized Game Verse.",
          client: "Individual Project",
          role: "Full Stack Developer",
          involvement: "I was in charge of the development of the web application and the Google Chrome extension. I was responsible for the development of the backend and the database as well as the development of the frontend.",
          fullStack: {
            frontend: [
              "Angular",
              "TypeScript",
              "RxJS",
              "FontAwesome",
              "Mat Angular"
            ],
            backend: [
              "bcryptjs",
              "body-parser",
              "dotenv",
              "express",
              "express-rate-limit",
              "helmet",
              "jsonwebtoken",
              "password-validator",
              "sequelize",
              "swagger"
            ],
            database: [
              "mysql",
              "mysql2"
            ],
            extension: [
              "React",
              "TypeScript",
              "Vite",
              "FontAwesome",
              "Axios",
              "react-spinners",
              "react-toastify",
              "redux"
            ]
          },
          tags: ['Angular', 'TypeScript', 'Node.js', 'Express', 'MySQL', 'Google Chrome Extension'],
          screenshot: Screenshots.GameVerseScreenshot,
          mockups: [Images.GameVerseLogo, Mockups.GameVerseMockup1, Mockups.GameVerseMockup2],
          website: "https://game-verse.jerome-baille.fr",
          github: {
            frontend: "",
            backend: "",
            extension: ""
          }
        },
        {
          id: "mes-gourmandys",
          featured: false,
          date: 2023,
          title: "Mes GourMandys",
          subtitle: "Sweet Memories, Daily Baked",
          description: "Mes GourMandy's, your go-to e-commerce pastry haven. Dive into our responsive web app, effortlessly browsing and adding delectable pastries to your cart. Create an account for order tracking worldwide, securely accessible from any device. The admin dashboard ensures smooth catalog and order management. Mes GourMandy's: Elevate your pastry shopping experience with simplicity, security, and a dash of sweetness.",
          client: "Individual Project",
          role: "Full Stack Developer",
          involvement: "",
          fullStack: {
            frontend: [
              "Angular",
              "TypeScript",
              "RxJS",
              "FontAwesome",
              "Bootstrap",
              "jwt-decode",
              "ng-image-slider"
            ],
            backend: [
              "bcryptjs",
              "body-parser",
              "cloudinary",
              "dotenv",
              "express",
              "express-rate-limit",
              "helmet",
              "jsonwebtoken",
              "password-validator",
              "mongoose",
              "multer",
              "sharp",
              "swagger"
            ],
            database: [
              "mongodb"
            ],
            extension: []
          },
          tags: ["Angular", "TypeScript", "Node.js", "Express", "MongoDB"],
          screenshot: Screenshots.MesGourmandysScreenshot,
          mockups: [Images.MesGourmandysLogo],
          website: "https://jerome-baille.github.io/MesGourMandys/accueil",
          github: {
            frontend: "",
            backend: "",
            extension: ""
          }
        },
        {
          id: "groupomania",
          featured: false,
          date: 2022,
          title: "Groupomania",
          subtitle: "United We Stand",
          description: "Welcome to Groupomania, your exclusive internal social network. This responsive web application caters to Groupomania employees, ensuring secure data access globally from any device. Engage dynamically by creating, editing, and deleting posts. Foster connections through comments and likes on colleagues' posts. For personalized control, create, and delete your account seamlessly. Administrators benefit from an admin dashboard for efficient user and post management. Groupomania: Redefining internal connectivity with simplicity and versatility.",
          client: "Educational Project",
          role: "Full Stack Developer",
          involvement: "Full Stack Developer",
          fullStack: {
            frontend: [
              "Angular",
              "TypeScript",
              "RxJS",
              "FontAwesome",
              "Bootstrap",
              "Sass"
            ],
            backend: [
              "bcryptjs",
              "body-parser",
              "dotenv",
              "express",
              "express-rate-limit",
              "helmet",
              "jsonwebtoken",
              "multer",
              "sequelize",
              "swagger"
            ],
            database: [
              "mysql",
              "mysql2"
            ],
            extension: []
          },
          tags: ["Angular", "TypeScript", "Node.js", "Express", "MySQL"],
          screenshot: '',
          mockups: [Images.GroupomaniaLogo, Mockups.GroupomaniaMockup1, Mockups.GroupomaniaMockup2],
          website: "",
          github: {
            frontend: "https://github.com/Jerome-Baille/JeromeBaille_7_23022022/tree/main/frontend",
            backend: "https://github.com/Jerome-Baille/JeromeBaille_7_23022022/tree/main/backend",
            extension: ""
          }
        },
        {
          id: "piiquante",
          featured: false,
          date: 2022,
          title: "Piiquante",
          subtitle: "There shall be one",
          description: "Welcome to Piiquante, your 'sauce gallery' experience. This web app lets you upload and rate favorite hot sauces. Create an account for personalized engagement, securely accessing your sauces from anywhere with our responsive app. Craft, edit, and delete your sauces seamlessly. Express your taste by liking or disliking other users' sauces. Piiquante transforms sauce sharing into a dynamic, flavorful journey, offering simplicity, security, and a dash of spice.",
          client: "Educational Project",
          role: "Backend Developer",
          involvement: "",
          fullStack: {
            frontend: [],
            backend: [
              "bcryptjs",
              "body-parser",
              "dotenv",
              "express",
              "express-rate-limit",
              "helmet",
              "jsonwebtoken",
              "mongoose",
              "multer",
              "sharp",
              "swagger"
            ],
            database: [
              "mongodb"
            ],
            extension: []
          },
          tags: ["Node.js", "Express", "MongoDB"],
          screenshot: '',
          mockups: [Images.PiiquanteLogo, Mockups.PiiquanteMockup1, Mockups.PiiquanteMockup2],
          website: "",
          github: {
            frontend: "",
            backend: "https://github.com/Jerome-Baille/JeromeBaille_6_24012022",
            extension: ""
          }
        },
        {
          id: "kanap",
          featured: false,
          date: 2022,
          title: "Kanap",
          subtitle: "Click, Clack, Relax",
          description: "Welcome to Kanap, your go-to e-commerce sofa haven. Dive into our responsive web app, effortlessly browsing and adding sofas to your cart. Create an account for order tracking worldwide, securely accessible from any device. The admin dashboard ensures smooth catalog and order management. Kanap: Elevate your sofa shopping with simplicity, security, and style.",
          client: "Educational Project",
          role: "Frontend Developer",
          involvement: "Addition of interactivity to the website using JavaScript. Creation of the shopping cart and the order form.",
          fullStack: {
            frontend: [
              "HTML",
              "CSS",
              "JavaScript",
            ],
            backend: [],
            database: [],
            extension: []
          },
          tags: ["Angular", "TypeScript", "Node.js", "Express", "MySQL"],
          screenshot: Screenshots.KanapScreenshot,
          mockups: [Images.KanapLogo, Mockups.KanapMockup1, Mockups.KanapMockup2],
          website: "https://jerome-baille.github.io/JeromeBaille_5_03012022/front/index.html",
          github: {
            frontend: "https://github.com/Jerome-Baille/JeromeBaille_5_03012022/tree/main/front",
            backend: "https://github.com/Jerome-Baille/JeromeBaille_5_03012022/tree/main/back",
            extension: ""
          }
        },
        {
          id: "lexir",
          featured: false,
          date: 2022,
          title: "Lexir",
          subtitle: "The direct distribution platform for craft drinks brands",
          description: "Welcome to Lexir, your premier craft drinks marketplace. Dive into our responsive web app, creating an account for a personalized experience. Elevate your brand by effortlessly adding it to our platform, connecting with a diverse audience. Users, explore our catalog, seamlessly order your favorite craft drinks, and enjoy a streamlined shopping process. Brands, manage your identity and products with ease through our intuitive platform. Lexir: Where craft drink enthusiasts and brands unite for a seamless and personalized beverage journey.",
          client: "Lexir Portugal",
          role: "Frontend Developer",
          involvement: "Integration of the website using Figma files.",
          fullStack: {
            frontend: [
              "Next.js",
              "TypeScript",
              "Tailwind CSS",
              "FontAwesome",
            ],
            backend: [],
            database: [],
            extension: []
          },
          tags: ["Next.js", "TypeScript", "Tailwind CSS"],
          screenshot: Screenshots.LexirScreenshot,
          mockups: [Images.LexirLogo, Mockups.LexirMockup1, Mockups.LexirMockup2],
          website: "https://shop.lexir.pt/",
          github: {
            frontend: "",
            backend: "",
            extension: ""
          }
        },
        {
          id: "la-chouette-agence",
          featured: false,
          date: 2021,
          title: "La Chouette Agence",
          subtitle: "",
          description: "La chouette agence est une agence de webdesign qui aide les entreprises à devenir attractives et visibles sur internet.",
          client: "Educational Project",
          role: "Frontend Developer",
          involvement: "Improvement of the SEO and accessibility of the website.",
          fullStack: {
            frontend: [
              "HTML",
              "CSS",
              "JavaScript",
            ],
            backend: [],
            database: [],
            extension: []
          },
          tags: ["HTML", "CSS", "JavaScript"],
          screenshot: Screenshots.LaChouetteAgenceScreenshot,
          mockups: [Images.LaChouetteAgenceLogo, Mockups.LaChouetteAgenceMockup1, Mockups.LaChouetteAgenceMockup2],
          website: "https://jerome-baille.github.io/JeromeBaille_4_09122021/",
          github: {
            frontend: "https://github.com/Jerome-Baille/JeromeBaille_4_09122021",
            backend: "",
            extension: ""
          }
        },
        {
          id: "ohmyfood",
          featured: false,
          date: 2021,
          title: "OhMyFood",
          subtitle: "",
          description: "Welcome to OhMyFood, your solution for stress-free dining. Explore our responsive website, browse restaurant catalogs, and conveniently pre-order your meal. With secure data access from any device, elevate your dining experience with simplicity and efficiency. OhMyFood: Where anticipation meets convenience in a seamless pre-ordering journey.",
          client: "Educational Project",
          role: "Full Stack Developer",
          involvement: "Addition of animations to the website using CSS and JavaScript.",
          fullStack: {
            frontend: [
              "HTML",
              "CSS",
              "JavaScript",
            ],
            backend: [],
            database: [],
            extension: []
          },
          tags: ["HTML", "CSS", "JavaScript"],
          screenshot: Screenshots.OhMyFoodScreenshot,
          mockups: [Images.OhMyFoodLogo, Mockups.OhmyfoodMockup1, Mockups.OhmyfoodMockup2],
          website: "https://jerome-baille.github.io/ohmyfood/index.html",
          github: {
            frontend: "https://github.com/Jerome-Baille/ohmyfood",
            backend: "",
            extension: ""
          }
        },
        {
          id: "phocea-travel",
          featured: false,
          date: 2021,
          title: "Phocéa Travel",
          subtitle: "",
          description: "Embark on a seamless travel experience with Phocea Travel. Our responsive website lets you effortlessly explore stays and activities. Securely access your data from anywhere, on any device, enhancing the convenience of your travel plans. Book your dream stay or activity with ease, making Phocea Travel your go-to for a personalized and secure travel adventure.",
          client: "Educational Project",
          role: "Frontend Developer",
          involvement: "Integration of the website using Figma files.",
          fullStack: {
            frontend: [
              "React",
              "Vite",
              "TypeScript",
              "Sass",
              "FontAwesome"
            ],
            backend: [],
            database: [],
            extension: []
          },
          tags: ["React", "TypeScript", "Sass"],
          screenshot: Screenshots.PhoceaTravelScreenshot,
          mockups: [Images.PhoceaTravelLogo, Mockups.PhoceaTravelMockup1, Mockups.PhoceaTravelMockup2],
          website: "https://jerome-baille.github.io/phocea-travel/",
          github: {
            frontend: "https://github.com/Jerome-Baille/phocea-travel",
            backend: "",
            extension: ""
          }
        },
        {
          id: "ki-culture",
          featured: false,
          date: 2020,
          title: "Ki Culture",
          subtitle: "Sustainability is the future. Culture is the key. We are Ki Culture.",
          description: "Welcome to Ki Culture, your responsive cultural association platform. Experience secure login and registration for museums and organizations, fostering a connected community. Dive into an online social media platform designed exclusively for cultural entities, promoting collaboration and engagement. Unveil a dynamic badge system that adds a unique dimension to recognition. Ki Culture: Where secure connections, collaborative platforms, and recognition converge for a vibrant cultural experience.",
          client: "Ki Culture",
          role: "Frontend and Backend Developer",
          involvement: "Integration of the backoffice using Figma files (80%). I was also involved in the development of the backend (20%).",
          fullStack: {
            frontend: [
              "React",
              "Vite",
              "TypeScript",
              "Sass",
              "FontAwesome"
            ],
            backend: [
              "bcryptjs",
              "body-parser",
              "dotenv",
              "express",
              "express-rate-limit",
              "helmet",
              "jsonwebtoken",
              "mongoose",
              "multer",
              "sharp"
            ],
            database: [
              "mysql",
              "mysql2"
            ],
            extension: []
          },
          tags: ["React", "TypeScript", "Node.js", "Express", "MySQL"],
          screenshot: Screenshots.KiCultureScreenshot,
          mockups: [Images.KiCultureLogo],
          website: "https://www.kiculture.org/",
          github: {
            frontend: "",
            backend: "",
            extension: ""
          }
        },
        {
          id: "my-portfolio-v1",
          featured: false,
          date: 2020,
          title: "My Portfolio V1",
          subtitle: "",
          description: "Explore a developer's showcase—an interactive portfolio with a sleek, responsive design. Immerse yourself in the sophistication of dark mode and engage with captivating animations that bring projects to life. Connect seamlessly through a user-friendly contact form. This portfolio isn't just a website; it's a dynamic exhibition of skills and creativity, where design meets functionality in a seamless digital experience.",
          client: "Personal Project",
          role: "Frontend Developer",
          involvement: "Creation of the website.",
          fullStack: {
            frontend: [
              "React",
              "Vite",
              "TypeScript",
              "Chakra UI",
              "FontAwesome",
              "Formik",
              "Yup",
              "EmailJS",
              "React Toastify",
              "React Scroll"
            ],
            backend: [],
            database: [],
            extension: []
          },
          tags: ["React", "TypeScript"],
          screenshot: Screenshots.PortfolioV1Screenshot,
          mockups: [Images.PortfolioV1Logo],
          website: "https://v1.jerome-baille.fr",
          github: {
            frontend: "",
            backend: "",
            extension: ""
          }
        },
        {
          id: "cloisonism",
          featured: false,
          date: 2019,
          title: "Cloisonism",
          subtitle: "",
          description: "Cloisonism invites you to a digital art gallery experience. Immerse yourself in the artist's creations with our responsive website. Explore the artworks, connect by contacting the artist, and engage on a social media platform designed for artistic interactions. Admins can efficiently manage artworks and messages through the dashboard. Cloisonism is not just a website; it's a digital canvas where discovery, connection, and curation seamlessly converge.",
          client: "Personal Project",
          role: "Full Stack Developer",
          involvement: "Development of the website in collaboration with the designers and backend developers. Improvement of the SEO and accessibility of the website. Development of the admin dashboard.",
          fullStack: {
            frontend: [
              "Angular",
              "TypeScript",
              "RxJS",
              "FontAwesome",
              "Bootstrap",
              "Sass"
            ],
            backend: [
              "bcryptjs",
              "body-parser",
              "dotenv",
              "express",
              "express-rate-limit",
              "helmet",
              "jsonwebtoken",
              "mongoose",
              "multer",
              "sharp"
            ],
            database: [
              "mysql",
              "mysql2"
            ],
            extension: []
          },
          tags: ["React", "TypeScript", "Node.js", "Express", "MySQL"],
          screenshot: '',
          mockups: [],
          website: "",
          github: {
            frontend: "",
            backend: "",
            extension: ""
          }
        }
      ];

      this.projectsSubject.next(projects);
    });
  }

  // Method to get a project by ID
  getProjectById(id: string): Observable<Project | undefined> {
    return new Observable(subscriber => {
      this.projects$.subscribe(projects => {
        const project = projects.find(p => p.id === id);
        subscriber.next(project);
        subscriber.complete();
      });
    });
  }

  // Method to get filtered projects
  getFilteredProjects(filters: { [key: string]: any }): Observable<Project[]> {
    return new Observable(subscriber => {
      this.projects$.subscribe(projects => {
        let filteredProjects = [...projects];

        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            filteredProjects = filteredProjects.filter(project => {
              // Check if the key exists in the project
              if (!(key in project)) {
                return true; // Skip filtering if the key doesn't exist
              }

              const projectValue = project[key as keyof Project];

              // Handle array values (like tags)
              if (Array.isArray(projectValue)) {
                return projectValue.includes(value);
              }

              // Handle non-array values
              return projectValue === value;
            });
          }
        });

        subscriber.next(filteredProjects);
        subscriber.complete();
      });
    });
  }

  // Method to get unique tags
  getAllTags(): Observable<string[]> {
    return new Observable(subscriber => {
      this.projects$.subscribe(projects => {
        const tags = new Set<string>();
        projects.forEach(project => {
          project.tags.forEach(tag => tags.add(tag));
        });
        subscriber.next(Array.from(tags));
        subscriber.complete();
      });
    });
  }

  // Method to get projects sorted by date
  getProjectsSortedByDate(): Observable<Project[]> {
    return new Observable(subscriber => {
      this.projects$.subscribe(projects => {
        const sortedProjects = [...projects].sort((a, b) => b.date - a.date);
        subscriber.next(sortedProjects);
        subscriber.complete();
      });
    });
  }
}
