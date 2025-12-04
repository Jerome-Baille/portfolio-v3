export interface FullStack {
    frontend: string[];
    backend: string[];
    database: string[];
    extension: string[];
}

export interface Github {
    frontend: string;
    backend: string;
    extension: string;
}

export interface ImageFormats {
    png: string;
    avif: string;
    webp: string;
}

export interface Project {
    id: string;
    featured: boolean;
    date: number;
    title: string;
    subtitle: string;
    description: string;
    client: string;
    role: string;
    involvement: string;
    fullStack: FullStack;
    tags: string[];
    logo: ImageFormats;
    screenshot: ImageFormats;
    mockups: ImageFormats[];
    website: string;
    github: Github;
}

export interface Images {
    Portrait: string;
    PortfolioLogo: string;
    PortfolioV1Logo: string;
    JobTrackerLogo: string;
    PantryPalLogo: string;
    GameVerseLogo: string;
    FlickPickLogo: string;
    GroupomaniaLogo: string;
    PiiquanteLogo: string;
    LexirLogo: string;
    LaChouetteAgenceLogo: string;
    OhMyFoodLogo: string;
    PhoceaTravelLogo: string;
    KiCultureLogo: string;
    MesGourmandysLogo: string;
    KanapLogo: string;
}

export interface Mockups {
    JobTrackerMockup1: string;
    JobTrackerMockup2: string;
    JobTrackerMockup3: string;
    PantryPalMockup1: string;
    PantryPalMockup2: string;
    PantryPalMockup3: string;
    GameVerseMockup1: string;
    GameVerseMockup2: string;
    FlickPickMockup1: string;
    FlickPickMockup2: string;
    GroupomaniaMockup1: string;
    GroupomaniaMockup2: string;
    KanapMockup1: string;
    KanapMockup2: string;
    LaChouetteAgenceMockup1: string;
    LaChouetteAgenceMockup2: string;
    OhmyfoodMockup1: string;
    OhmyfoodMockup2: string;
    PhoceaTravelMockup1: string;
    PhoceaTravelMockup2: string;
    PiiquanteMockup1: string;
    PiiquanteMockup2: string;
    LexirMockup1: string;
    LexirMockup2: string;
}

export interface Screenshots {
    PortfolioV1Screenshot: string;
    JobTrackerScreenshot: string;
    PantryPalScreenshot: string;
    FlickPickScreenshot: string;
    GameVerseScreenshot: string;
    MesGourmandysScreenshot: string;
    KanapScreenshot: string;
    LexirScreenshot: string;
    LaChouetteAgenceScreenshot: string;
    OhMyFoodScreenshot: string;
    PhoceaTravelScreenshot: string;
    KiCultureScreenshot: string;
}