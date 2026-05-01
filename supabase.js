// -----------------------------------------------------------------------------
// IMPORTANTE: Estos valores corresponden a la URL y la clave anónima de tu proyecto de Supabase.
// Se han obtenido de la configuración de tu proyecto, en la sección de API.
// -----------------------------------------------------------------------------
const SUPABASE_URL = 'https://ymvrggtttmfskibhxatr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltdnJnZ3R0dG1mc2tpYmh4YXRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2NTQwNDAsImV4cCI6MjA5MzIzMDA0MH0.vFVkyfAvAnkRgbhCYFnJ_S_SwIOet3taXypHtWcmIWA';
// -----------------------------------------------------------------------------


// Obtenemos la función para crear el cliente desde el objeto global 'supabase'
// que nos proporciona la librería que cargaremos en el HTML.
const { createClient } = supabase;

// Creamos el cliente de Supabase. Este objeto será nuestro punto de entrada
// para todas las interacciones con la base de datos y la autenticación.
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Para que sea fácilmente accesible desde nuestro script principal en index.html,
// lo asignamos al objeto global 'window' otra vez, pero ya inicializado.
window.supabase = supabaseClient;

console.log('Supabase Client Initialized. Ready to connect.');