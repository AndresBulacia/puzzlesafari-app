const imageResolver = (imagePath) => {
    const images = {
        "assets/images/Nivel_1_Elefante/elefante-piece-1.png": require("../assets/images/Nivel_1_Elefante/elefante-piece-1.png"),
        "assets/images/Nivel_1_Elefante/elefante-piece-2.png": require("../assets/images/Nivel_1_Elefante/elefante-piece-2.png"),
        "assets/images/Nivel_1_Elefante/elefante-piece-3.png": require("../assets/images/Nivel_1_Elefante/elefante-piece-3.png"),
        "assets/images/Nivel_1_Elefante/elefante-piece-4.png": require("../assets/images/Nivel_1_Elefante/elefante-piece-4.png"),
        "assets/images/Nivel_1_Elefante/elefante-completo.png": require("../assets/images/Nivel_1_Elefante/elefante-completo.png"),

        "assets/images/Nivel_2_Mono/mono-piece-1.png": require("../assets/images/Nivel_2_Mono/mono-piece-1.png"),
        "assets/images/Nivel_2_Mono/mono-piece-2.png": require("../assets/images/Nivel_2_Mono/mono-piece-2.png"),
        "assets/images/Nivel_2_Mono/mono-piece-3.png": require("../assets/images/Nivel_2_Mono/mono-piece-3.png"),
        "assets/images/Nivel_2_Mono/mono-piece-4.png": require("../assets/images/Nivel_2_Mono/mono-piece-4.png"),
        "assets/images/Nivel_2_Mono/mono-completo.png": require("../assets/images/Nivel_2_Mono/mono-completo.png"),

        "assets/images/Nivel_3_Cebra/cebra-piece-1.png": require("../assets/images/Nivel_3_Cebra/cebra-piece-1.png"),
        "assets/images/Nivel_3_Cebra/cebra-piece-2.png": require("../assets/images/Nivel_3_Cebra/cebra-piece-2.png"),
        "assets/images/Nivel_3_Cebra/cebra-piece-3.png": require("../assets/images/Nivel_3_Cebra/cebra-piece-3.png"),
        "assets/images/Nivel_3_Cebra/cebra-piece-4.png": require("../assets/images/Nivel_3_Cebra/cebra-piece-4.png"),
        "assets/images/Nivel_3_Cebra/cebra-completo.png": require("../assets/images/Nivel_3_Cebra/cebra-completo.png"),

        "assets/images/Nivel_4_Leon/leon-piece-1.png": require("../assets/images/Nivel_4_Leon/leon-piece-1.png"),
        "assets/images/Nivel_4_Leon/leon-piece-2.png": require("../assets/images/Nivel_4_Leon/leon-piece-2.png"),
        "assets/images/Nivel_4_Leon/leon-piece-3.png": require("../assets/images/Nivel_4_Leon/leon-piece-3.png"),
        "assets/images/Nivel_4_Leon/leon-piece-4.png": require("../assets/images/Nivel_4_Leon/leon-piece-4.png"),
        "assets/images/Nivel_4_Leon/leon-completo.png": require("../assets/images/Nivel_4_Leon/leon-completo.png"),

        "assets/images/Nivel_5_Rino/rino-piece-1.png": require("../assets/images/Nivel_5_Rino/rino-piece-1.png"),
        "assets/images/Nivel_5_Rino/rino-piece-2.png": require("../assets/images/Nivel_5_Rino/rino-piece-2.png"),
        "assets/images/Nivel_5_Rino/rino-piece-3.png": require("../assets/images/Nivel_5_Rino/rino-piece-3.png"),
        "assets/images/Nivel_5_Rino/rino-piece-4.png": require("../assets/images/Nivel_5_Rino/rino-piece-4.png"),
        "assets/images/Nivel_5_Rino/rino-completo.png": require("../assets/images/Nivel_5_Rino/rino-completo.png"),
    };

    return images[imagePath] || null;
};

export default imageResolver;
