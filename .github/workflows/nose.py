from openai import OpenAI  # Supuesto import para ilustración del uso de API

# Inicializamos la API de Azure OpenAI
openai_api = OpenAI(api_key="your_azure_openai_api_key")

# Función que identifica la intención y genera el query SQL en una sola llamada
def generar_intencion_y_query(mensaje_cliente):
    prompt = (
        f"Eres un asistente para un restaurante de comida rápida exclusivo de nuestra cadena. "
        f"Solo puedes responder preguntas relacionadas con el menú, los pedidos o la información de clientes de este restaurante, "
        f"no de otros restaurantes. El cliente dice: '{mensaje_cliente}'.\n\n"
        "Determina si la consulta necesita acceso a la base de datos de nuestro restaurante y, si es así, genera el query SQL adecuado. "
        "Si no es necesario, proporciona una respuesta directa. Si la consulta no está relacionada con nuestro restaurante, "
        "responde con 'FUERA_DE_CONTEXTO'.\n\n"
        "Base de datos:\n"
        "- Tabla `Menu`: item_id, nombre, precio, disponibilidad\n"
        "- Tabla `Pedidos`: pedido_id, fecha, cliente_id, total, estado\n"
        "- Tabla `Clientes`: cliente_id, nombre, historial_pedidos, preferencias\n\n"
        "Formato de respuesta:\n"
        "{'tipo': 'NO_SQL', 'respuesta': '[respuesta]'} o {'tipo': 'SQL', 'query': '[query SQL]'} "
        "o {'tipo': 'FUERA_DE_CONTEXTO', 'respuesta': 'Lo siento, solo puedo responder preguntas sobre nuestro restaurante.'}\n\n"
    )
    
    # Llamada a la API
    respuesta = openai_api.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        max_tokens=150
    )

    # Procesamos la respuesta
    texto_respuesta = respuesta.choices[0].text.strip()
    
    # Intentamos convertir el JSON de la respuesta a un diccionario
    try:
        respuesta_dict = eval(texto_respuesta)  # Usamos eval aquí como suposición; usar json.loads sería mejor si JSON es estricto
    except SyntaxError:
        return {"error": "Error al procesar la respuesta"}

    return respuesta_dict

# Función que interpreta y formatea los resultados SQL
def interpretar_resultado_sql(resultados):
    if not resultados:
        return "No se encontró información relevante para su consulta."

    resultado_formateado = "\n".join(
        [", ".join(f"{key}: {value}" for key, value in fila.items()) for fila in resultados]
    )

    prompt_interpretacion = (
        f"Eres un asistente de nuestro restaurante. Tienes los siguientes datos del sistema: {resultado_formateado}. "
        "Responde de manera amigable al cliente en base a esta información."
    )
    
    respuesta = openai_api.Completion.create(
        model="text-davinci-003",
        prompt=prompt_interpretacion,
        max_tokens=100
    )

    return respuesta.choices[0].text.strip()

# Ejemplo de uso
mensaje_cliente = "¿Cuáles son los precios de las hamburguesas en McDonald's?"
resultado = generar_intencion_y_query(mensaje_cliente)

# Verificar el tipo de respuesta que se obtuvo
if resultado.get("tipo") == "FUERA_DE_CONTEXTO":
    respuesta_cliente = resultado["respuesta"]  # Mensaje de fuera de contexto
elif resultado.get("tipo") == "SQL":
    query_sql = resultado["query"]
    resultados_sql = ejecutar_query(query_sql)  # Función ficticia para ejecutar query en la DB
    respuesta_cliente = interpretar_resultado_sql(resultados_sql)
elif resultado.get("tipo") == "NO_SQL":
    respuesta_cliente = resultado["respuesta"]
else:
    respuesta_cliente = "Hubo un error procesando la consulta."

print(respuesta_cliente)
