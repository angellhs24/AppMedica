
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { GoogleGenerativeAI } from 'https://esm.sh/@google/generative-ai';

// Define las cabeceras CORS para permitir peticiones desde el cliente
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Inicia el servidor
serve(async (req) => {
  // Responde a las solicitudes OPTIONS (pre-vuelo de CORS)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 1. Extrae la pregunta del usuario del cuerpo de la petición
    const { query } = await req.json();
    if (!query) {
      throw new Error('No se proporcionó ninguna pregunta (query) en el cuerpo de la solicitud.');
    }

    // 2. Obtiene la clave de API de Gemini desde los secretos de Supabase
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('La clave de API de Gemini (GEMINI_API_KEY) no está configurada en los secretos del proyecto.');
    }

    // 3. Inicializa el cliente de IA de Google
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // 4. Crea un prompt claro y seguro para la IA
    const prompt = `
      Eres un asistente de salud virtual para una aplicación de expediente médico. 
      Tu objetivo es proporcionar información general y educativa sobre temas de salud.
      IMPORTANTE: No eres un doctor y NO debes proporcionar diagnósticos, recetas ni consejos médicos específicos.
      Siempre debes empezar o terminar tu respuesta recordando al usuario que consulte a un profesional de la salud para un consejo real.
      
      Pregunta del usuario: "${query}"
    `;

    // 5. Llama a la API de Gemini para obtener la respuesta
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // 6. Devuelve la respuesta al cliente
    return new Response(JSON.stringify({ reply: text }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (e) {
    // Manejo de errores centralizado
    const error = e instanceof Error ? e : new Error(String(e));
    console.error(error.message); // Log del error en el servidor de Supabase
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
