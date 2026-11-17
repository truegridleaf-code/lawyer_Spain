/**
 * Universal Image Resilience Handler
 * Automatically resolves any path discrepancy between root and images/ subfolder
 */
window.addEventListener('error', function(e) {
  if (e.target && e.target.tagName === 'IMG') {
    var img = e.target;
    if (!img.dataset.autoRetried) {
      img.dataset.autoRetried = '1';
      var raw = img.getAttribute('src') || '';
      if (raw.indexOf('/') === -1 && raw.indexOf('http') === -1) {
        img.src = 'images/' + raw;
      } else if (raw.indexOf('images/') === 0) {
        img.src = raw.replace('images/', '');
      }
    }
  }
}, true);

/**
 * TrueGrid Leaf - Despacho de Abogados en Madrid (España)
 * Lógica Interactiva 100% en Español
 * Estilo y Experiencia de Usuario inspirada en EK Abogados (ekabogados.com)
 */

document.addEventListener('DOMContentLoaded', () => {
  initOfficeHours();
  initMobileNavigation();
  initFaqAccordion();
  initServicesCatalog();
  initFeeCalculator();
  initConsultationModal();
  initContactForms();
  initHeaderScroll();
  initHeroParallax();
});

/* ==========================================================================
   1. Base de Datos Completa de los 106 Servicios Jurídicos (100% en Castellano)
   ========================================================================== */
const SERVICIOS_JURIDICOS = [
  // A. Derecho de Familia, Matrimonial y Sucesiones (1-12)
  { id: 1, cat: 'familia', catName: 'Derecho de Familia', title: 'Abogado de Divorcio Exprés y Notarial', desc: 'Disolución rápida de mutuo acuerdo ante Notario en Madrid o por vía judicial.', time: '1 - 3 semanas', fee: 'Desde 450 €' },
  { id: 2, cat: 'familia', catName: 'Derecho de Familia', title: 'Divorcio Contencioso con Menores', desc: 'Defensa procesal en rupturas conflictivas, liquidación y medidas paternofiliales.', time: '2 - 6 meses', fee: 'Desde 850 €' },
  { id: 3, cat: 'familia', catName: 'Derecho de Familia', title: 'Custodia Compartida y Régimen de Visitas', desc: 'Fijación y modificación de custodia compartida, exclusiva y patria potestad.', time: '2 - 4 meses', fee: 'Desde 600 €' },
  { id: 4, cat: 'familia', catName: 'Derecho de Familia', title: 'Pensión de Alimentos y Reclamación de Impagos', desc: 'Reclamación judicial por impago de alimentos y ejecución de títulos judiciales.', time: '1 - 3 meses', fee: 'Desde 350 €' },
  { id: 5, cat: 'familia', catName: 'Derecho de Familia', title: 'Pensión Compensatoria por Ruptura', desc: 'Determinación legal por desequilibrio patrimonial tras el cese conyugal.', time: '2 - 3 meses', fee: 'Desde 400 €' },
  { id: 6, cat: 'familia', catName: 'Derecho de Familia', title: 'Liquidación de Sociedad de Gananciales', desc: 'Inventario, tasación pericial y adjudicación notarial de bienes del matrimonio.', time: '1 - 4 meses', fee: 'Desde 700 €' },
  { id: 7, cat: 'familia', catName: 'Derecho de Familia', title: 'Capitulaciones Matrimoniales y Separación de Bienes', desc: 'Escritura pública previa o posterior al matrimonio para blindar patrimonios.', time: '3 - 7 días', fee: 'Desde 280 €' },
  { id: 8, cat: 'familia', catName: 'Derecho de Familia', title: 'Modificación Judicial de Medidas de Familia', desc: 'Ajuste de pensiones y custodias por cambio sustancial de circunstancias económicas.', time: '2 - 4 meses', fee: 'Desde 550 €' },
  { id: 9, cat: 'familia', catName: 'Derecho de Familia', title: 'Herencias, Testamentos y Declaración de Herederos', desc: 'Planificación sucesoria, testamentos notariales y actas de notoriedad en Madrid.', time: '2 - 4 semanas', fee: 'Desde 350 €' },
  { id: 10, cat: 'familia', catName: 'Derecho de Familia', title: 'Partición Judicial de Herencias y Legítimas', desc: 'División judicial de herencia, juicio de testamentaría y defensa de legitimarios.', time: '3 - 8 meses', fee: 'Desde 900 €' },
  { id: 11, cat: 'familia', catName: 'Derecho de Familia', title: 'Filiación, Paternidad y Tutelas Legales', desc: 'Acciones judiciales de reclamación o impugnación de filiación y curatelas.', time: '3 - 6 meses', fee: 'Desde 650 €' },
  { id: 12, cat: 'familia', catName: 'Derecho de Familia', title: 'Mediación Familiar y Acuerdos Extrajudiciales', desc: 'Resolución pacífica de controversias conyugales y convenios reguladores.', time: '2 - 4 semanas', fee: 'Desde 400 €' },

  // B. Extranjería, Movilidad Internacional y Nacionalidad (13-24)
  { id: 13, cat: 'extranjeria', catName: 'Extranjería y Visados', title: 'Visado de Nómada Digital (Ley de Startups)', desc: 'Autorización de residencia para teletrabajadores internacionales y familiares.', time: '20 días hábiles', fee: 'Desde 650 €' },
  { id: 14, cat: 'extranjeria', catName: 'Extranjería y Visados', title: 'Golden Visa (Residencia por Inversión)', desc: 'Permiso de residencia por adquisición de inmuebles (+500k€) o fondos.', time: '20 días hábiles', fee: 'Desde 1.200 €' },
  { id: 15, cat: 'extranjeria', catName: 'Extranjería y Visados', title: 'Nacionalidad Española Telemática por Residencia', desc: 'Tramitación exprés ante el Ministerio de Justicia con certificado ICAM.', time: '3 - 6 meses', fee: 'Desde 300 €' },
  { id: 16, cat: 'extranjeria', catName: 'Extranjería y Visados', title: 'Arraigo Social con Contrato o Cuenta Propia', desc: 'Regularización tras 3 años de permanencia continuada e informe de arraigo.', time: '1 - 3 meses', fee: 'Desde 400 €' },
  { id: 17, cat: 'extranjeria', catName: 'Extranjería y Visados', title: 'Arraigo Familiar para Ciudadanos Españoles', desc: 'Autorización por 5 años para progenitores, cónyuges e hijos de españoles.', time: '1 - 2 meses', fee: 'Desde 350 €' },
  { id: 18, cat: 'extranjeria', catName: 'Extranjería y Visados', title: 'Arraigo Laboral y para la Formación', desc: 'Permisos por relaciones laborales acreditadas o cursos formativos reglados.', time: '1 - 3 meses', fee: 'Desde 380 €' },
  { id: 19, cat: 'extranjeria', catName: 'Extranjería y Visados', title: 'Solicitud Urgente de NIE de No Residente', desc: 'Obtención rápida de NIE para compras inmobiliarias, herencias y empresas.', time: '3 - 7 días', fee: 'Desde 120 €' },
  { id: 20, cat: 'extranjeria', catName: 'Extranjería y Visados', title: 'Tarjeta de Familiar de Comunitario (UE)', desc: 'Residencia en régimen comunitario para parejas de hecho, cónyuges y ascendientes.', time: '1 - 2 meses', fee: 'Desde 350 €' },
  { id: 21, cat: 'extranjeria', catName: 'Extranjería y Visados', title: 'Renovación Telemática de Permisos de Residencia', desc: 'Gestión telemática con resguardo de prórroga automática y toma de huellas.', time: '15 - 30 días', fee: 'Desde 180 €' },
  { id: 22, cat: 'extranjeria', catName: 'Extranjería y Visados', title: 'Visado de Estudiante y Prórroga de Estancia', desc: 'Autorizaciones de estancia por estudios superiores, másteres e investigación.', time: '20 - 30 días', fee: 'Desde 300 €' },
  { id: 23, cat: 'extranjeria', catName: 'Extranjería y Visados', title: 'Recursos ante Denegaciones de Extranjería', desc: 'Recurso de reposición y recurso contencioso-administrativo ante TSJ.', time: '1 - 2 meses', fee: 'Desde 350 €' },
  { id: 24, cat: 'extranjeria', catName: 'Extranjería y Visados', title: 'Asilo Político y Protección Internacional', desc: 'Asesoramiento letrado integral en peticiones de asilo, citas y recursos.', time: 'Seguimiento continuo', fee: 'Desde 450 €' },

  // C. Derecho Penal y Procesal Penal (25-35)
  { id: 25, cat: 'penal', catName: 'Derecho Penal', title: 'Asistencia al Detenido en Comisarías y Juzgados 24h', desc: 'Defensa inmediata de guardia en Madrid y Plaza de Castilla sin demoras.', time: 'Urgencias 24h', fee: 'Desde 250 €' },
  { id: 26, cat: 'penal', catName: 'Derecho Penal', title: 'Juicios Rápidos por Alcoholemia y Tráfico', desc: 'Defensa en delitos de seguridad vial, conformidades ventajosas y recursos.', time: 'Juicio Rápido 48h', fee: 'Desde 300 €' },
  { id: 27, cat: 'penal', catName: 'Derecho Penal', title: 'Delitos Económicos, Fraudes y Estafas', desc: 'Defensa y acusación particular en alzamiento de bienes, fraudes y estafas.', time: '2 - 6 meses', fee: 'Presupuesto cerrado' },
  { id: 28, cat: 'penal', catName: 'Derecho Penal', title: 'Apropiación Indebida y Delitos Societarios', desc: 'Responsabilidad penal de administradores, falsedad documental y administración desleal.', time: '3 - 8 meses', fee: 'Presupuesto cerrado' },
  { id: 29, cat: 'penal', catName: 'Derecho Penal', title: 'Violencia de Género y Medidas de Alejamiento', desc: 'Asistencia técnica inmediata en Juzgados de Violencia sobre la Mujer de Madrid.', time: 'Inmediata', fee: 'Desde 400 €' },
  { id: 30, cat: 'penal', catName: 'Derecho Penal', title: 'Ciberdelitos, Estafas Telemáticas y Phishing', desc: 'Peritaje digital y querellas por suplantación bancaria y estafas por internet.', time: '1 - 4 meses', fee: 'Desde 450 €' },
  { id: 31, cat: 'penal', catName: 'Derecho Penal', title: 'Tráfico de Drogas y Salud Pública', desc: 'Intervención procesal letrada en incautaciones, registros y prisión provisional.', time: 'Proceso judicial', fee: 'Presupuesto cerrado' },
  { id: 32, cat: 'penal', catName: 'Derecho Penal', title: 'Delitos de Lesiones, Coacciones y Amenazas', desc: 'Acción penal e indemnización civil por daños corporales y menoscabo físico.', time: '1 - 3 meses', fee: 'Desde 350 €' },
  { id: 33, cat: 'penal', catName: 'Derecho Penal', title: 'Cancelación de Antecedentes Penales y Policiales', desc: 'Eliminación legal de registros en el Ministerio de Justicia y bases policiales.', time: '2 - 4 semanas', fee: 'Desde 150 €' },
  { id: 34, cat: 'penal', catName: 'Derecho Penal', title: 'Recursos de Apelación y Casación Penal', desc: 'Impugnación de sentencias condenatorias ante la Audiencia Provincial y Tribunal Supremo.', time: 'Plazos estrictos', fee: 'Desde 850 €' },
  { id: 35, cat: 'penal', catName: 'Derecho Penal', title: 'Acusación Particular y Responsabilidad Civil Derivada', desc: 'Personación en nombre de víctimas para exigir la máxima condena e indemnización.', time: 'Proceso penal', fee: 'Desde 600 €' },

  // D. Derecho Inmobiliario, Arras y Arrendamientos (36-46)
  { id: 36, cat: 'inmobiliario', catName: 'Derecho Inmobiliario', title: 'Due Diligence Legal Inmobiliaria Completa', desc: 'Auditoría exhaustiva registral, urbanística, catastral y de deudas comunitarias.', time: '5 - 10 días', fee: 'Desde 450 €' },
  { id: 37, cat: 'inmobiliario', catName: 'Derecho Inmobiliario', title: 'Redacción y Blindaje de Contratos de Arras', desc: 'Arras penitenciales blindadas protegiendo depósitos del comprador o vendedor.', time: '24 - 48 horas', fee: 'Desde 300 €' },
  { id: 38, cat: 'inmobiliario', catName: 'Derecho Inmobiliario', title: 'Asistencia Letrada en Escritura Notarial de Compraventa', desc: 'Revisión jurídica de minuta notarial, poderes, medios de pago y firma en Madrid.', time: 'Acompañamiento', fee: 'Tarifa plana' },
  { id: 39, cat: 'inmobiliario', catName: 'Derecho Inmobiliario', title: 'Liquidación de Impuestos de Compraventa (ITP / AJD)', desc: 'Presentación telemática del Modelo 600 de transmisiones patrimoniales en Madrid.', time: '3 - 7 días', fee: 'Desde 180 €' },
  { id: 40, cat: 'inmobiliario', catName: 'Derecho Inmobiliario', title: 'Contratos de Arrendamiento Urbano (LAU) Blindados', desc: 'Arrendamiento de vivienda habitual, temporada o local con garantías adicionales.', time: '24 - 48 horas', fee: 'Desde 200 €' },
  { id: 41, cat: 'inmobiliario', catName: 'Derecho Inmobiliario', title: 'Procedimiento Judicial de Desahucio por Impago', desc: 'Recuperación de la posesión y reclamación judicial de rentas pendientes.', time: '2 - 6 meses', fee: 'Desde 650 €' },
  { id: 42, cat: 'inmobiliario', catName: 'Derecho Inmobiliario', title: 'Desahucio por Ocupación Ilegal de Vivienda', desc: 'Medidas cautelares de desalojo inmediato e interdicto posesorio judicial.', time: '1 - 3 meses', fee: 'Desde 750 €' },
  { id: 43, cat: 'inmobiliario', catName: 'Derecho Inmobiliario', title: 'Extinción de Condominio y División de Cosa Común', desc: 'Disolución de proindivisos sobre inmuebles de copropietarios o exparejas.', time: '2 - 5 meses', fee: 'Desde 600 €' },
  { id: 44, cat: 'inmobiliario', catName: 'Derecho Inmobiliario', title: 'Reclamación por Vicios Ocultos y Defectos de Construcción', desc: 'Acciones de saneamiento y demandas contra constructoras o promotores.', time: '2 - 6 meses', fee: 'Desde 700 €' },
  { id: 45, cat: 'inmobiliario', catName: 'Derecho Inmobiliario', title: 'Plusvalía Municipal (IIVTNU) y Reclamaciones', desc: 'Autoliquidación con método más favorable y recursos por transmisiones en pérdidas.', time: '15 - 30 días', fee: 'Desde 150 €' },
  { id: 46, cat: 'inmobiliario', catName: 'Derecho Inmobiliario', title: 'Inscripciones y Rectificaciones en Registro de la Propiedad', desc: 'Inmatriculaciones, excesos de cabida, cancelaciones de hipotecas antiguas.', time: '1 - 2 meses', fee: 'Desde 350 €' },

  // E. Derecho Mercantil, Sociedades y Startups (47-58)
  { id: 47, cat: 'mercantil', catName: 'Derecho Mercantil', title: 'Constitución Telemática de Sociedades (SL / SA)', desc: 'Creación exprés en 72 horas mediante CIRCE con estatutos a medida y NIF.', time: '3 - 5 días', fee: 'Desde 350 €' },
  { id: 48, cat: 'mercantil', catName: 'Derecho Mercantil', title: 'Pactos de Socios y Acuerdos de Inversión', desc: 'Blindaje interno entre fundadores: drag along, tag along, vesting y no competencia.', time: '5 - 10 días', fee: 'Desde 450 €' },
  { id: 49, cat: 'mercantil', catName: 'Derecho Mercantil', title: 'Contratación Mercantil y Acuerdos de Distribución', desc: 'Contratos de agencia, suministro, franquicia, confidencialidad y prestación de servicios.', time: '48 - 72 horas', fee: 'Desde 250 €' },
  { id: 50, cat: 'mercantil', catName: 'Derecho Mercantil', title: 'Impugnación de Acuerdos Sociales y Junta de Socios', desc: 'Defensa de socios minoritarios y anulación judicial de acuerdos lesivos.', time: '2 - 5 meses', fee: 'Desde 750 €' },
  { id: 51, cat: 'mercantil', catName: 'Derecho Mercantil', title: 'Reclamación de Deudas Comerciales y Juicio Monitorio', desc: 'Cobro de facturas comerciales impagadas y ejecución dineraria sobre cuentas.', time: '15 - 45 días', fee: 'Fijo + % de éxito' },
  { id: 52, cat: 'mercantil', catName: 'Derecho Mercantil', title: 'Disolución, Liquidación y Cierre de Empresas', desc: 'Cese ordenado de actividad mercantil ante notario y Registro Mercantil.', time: '15 - 30 días', fee: 'Desde 400 €' },
  { id: 53, cat: 'mercantil', catName: 'Derecho Mercantil', title: 'Fusión, Escisión y Reestructuración Societaria', desc: 'Operaciones de modificación estructural societaria y canje de participaciones.', time: '1 - 3 meses', fee: 'Presupuesto cerrado' },
  { id: 54, cat: 'mercantil', catName: 'Derecho Mercantil', title: 'Asesoramiento Letrado a Consejos de Administración', desc: 'Secretaría no consejera, actas, certificaciones y gobierno corporativo.', time: 'Servicio continuo', fee: 'Iguala mensual' },
  { id: 55, cat: 'mercantil', catName: 'Derecho Mercantil', title: 'Acuerdos de Confidencialidad (NDA) y Secretos Empresariales', desc: 'Protección jurídica de propiedad industrial, know-how y bases de clientes.', time: '24 - 48 horas', fee: 'Desde 200 €' },
  { id: 56, cat: 'mercantil', catName: 'Derecho Mercantil', title: 'Concurso de Acreedores y Ley de Segunda Oportunidad', desc: 'Exoneración del pasivo insatisfecho para particulares y empresarios.', time: '3 - 8 meses', fee: 'Desde 1.100 €' },
  { id: 57, cat: 'mercantil', catName: 'Derecho Mercantil', title: 'Due Diligence Mercantil para Adquisiciones', desc: 'Auditoría legal previa a la compraventa de participaciones o activos de empresas.', time: '1 - 3 semanas', fee: 'Desde 900 €' },
  { id: 58, cat: 'mercantil', catName: 'Derecho Mercantil', title: 'Compliance Penal Empresarial y Prevención de Riesgos', desc: 'Diseño del canal de denuncias ético y mapa de prevención penal corporativo.', time: '1 mes', fee: 'Desde 800 €' },

  // F. Derecho Laboral, Despidos y Seguridad Social (59-68)
  { id: 59, cat: 'laboral', catName: 'Derecho Laboral', title: 'Defensa ante Despido Disciplinario e Improcedente', desc: 'Impugnación de despidos con reclamación de indemnización legal máxima.', time: '20 días de plazo', fee: 'Fijo + % de éxito' },
  { id: 60, cat: 'laboral', catName: 'Derecho Laboral', title: 'Despido Colectivo (ERE) y Suspensión de Contratos (ERTE)', desc: 'Asesoramiento letrado a empresas y comités en periodos de consulta.', time: '1 - 2 meses', fee: 'Presupuesto cerrado' },
  { id: 61, cat: 'laboral', catName: 'Derecho Laboral', title: 'Conciliación Laboral ante el SMAC en Madrid', desc: 'Redacción de papeleta de conciliación y asistencia letrada al acto oficial.', time: '15 - 30 días', fee: 'Desde 200 €' },
  { id: 62, cat: 'laboral', catName: 'Derecho Laboral', title: 'Reclamación de Salarios Impagados e Indemnizaciones', desc: 'Demanda judicial de reclamación de cantidad contra empleador o FOGASA.', time: '2 - 6 meses', fee: 'Desde 250 €' },
  { id: 63, cat: 'laboral', catName: 'Derecho Laboral', title: 'Acoso Laboral (Mobbing) y Tutela de Derechos', desc: 'Acción de extinción voluntaria indemnizada del art. 50 ET e indemnización adicional.', time: '1 - 4 meses', fee: 'Desde 500 €' },
  { id: 64, cat: 'laboral', catName: 'Derecho Laboral', title: 'Incapacidad Permanente (Total, Absoluta y Gran Invalidez)', desc: 'Recurso administrativo y demanda judicial contra el INSS por denegación.', time: '3 - 8 meses', fee: 'Fijo + éxito' },
  { id: 65, cat: 'laboral', catName: 'Derecho Laboral', title: 'Accidentes de Trabajo y Recargo de Prestaciones', desc: 'Reclamación de indemnización civil a la empresa por falta de medidas de seguridad.', time: '2 - 6 meses', fee: 'Porcentaje de éxito' },
  { id: 66, cat: 'laboral', catName: 'Derecho Laboral', title: 'Modificación Sustancial de Condiciones de Trabajo', desc: 'Impugnación de traslados forzosos, cambios de turno o rebajas de salario.', time: '20 días de plazo', fee: 'Desde 300 €' },
  { id: 67, cat: 'laboral', catName: 'Derecho Laboral', title: 'Redacción de Contratos de Alta Dirección', desc: 'Cláusulas de blindaje, indemnización pactada, confidencialidad y no competencia.', time: '48 - 72 horas', fee: 'Desde 400 €' },
  { id: 68, cat: 'laboral', catName: 'Derecho Laboral', title: 'Negociación Colectiva y Convenios de Empresa', desc: 'Asesoramiento técnico en mesas negociadoras y planes de igualdad obligatorios.', time: '1 - 3 meses', fee: 'Presupuesto cerrado' },

  // G. Derecho Fiscal, Impuestos y Tributario (69-78)
  { id: 69, cat: 'fiscal', catName: 'Derecho Fiscal', title: 'Régimen Especial Beckham para Impatriados', desc: 'Tributación reducida al 24% para trabajadores y directivos desplazados a España.', time: '10 - 20 días', fee: 'Desde 400 €' },
  { id: 70, cat: 'fiscal', catName: 'Derecho Fiscal', title: 'Fiscalidad de No Residentes (Modelo 210)', desc: 'Tributación de rentas inmobiliarias y ganancias patrimoniales de extranjeros.', time: 'Inmediato', fee: 'Desde 120 €' },
  { id: 71, cat: 'fiscal', catName: 'Derecho Fiscal', title: 'Planificación Fiscal del Impuesto sobre la Renta (IRPF)', desc: 'Declaraciones complejas, desgravaciones autonómicas de Madrid y rendimientos.', time: 'Campaña anual', fee: 'Desde 120 €' },
  { id: 72, cat: 'fiscal', catName: 'Derecho Fiscal', title: 'Impuesto sobre Sucesiones y Donaciones en Madrid', desc: 'Aplicación de la bonificación al 99% en la cuota tributaria entre familiares directos.', time: '15 - 30 días', fee: 'Desde 250 €' },
  { id: 73, cat: 'fiscal', catName: 'Derecho Fiscal', title: 'Impuesto sobre el Patrimonio y Grandes Fortunas', desc: 'Estrategias fiscales de consolidación patrimonial para evitar doble imposición.', time: '15 días', fee: 'Desde 450 €' },
  { id: 74, cat: 'fiscal', catName: 'Derecho Fiscal', title: 'Asistencia Letrada en Inspecciones de la AEAT', desc: 'Defensa técnica letrada ante actuaciones inspectoras de la Agencia Tributaria en Madrid.', time: 'Procedimiento tributario', fee: 'Desde 500 €' },
  { id: 75, cat: 'fiscal', catName: 'Derecho Fiscal', title: 'Recursos ante el Tribunal Económico-Administrativo (TEAR)', desc: 'Reclamaciones económico-administrativas contra liquidaciones y sanciones tributarias.', time: '1 - 3 meses', fee: 'Desde 450 €' },
  { id: 76, cat: 'fiscal', catName: 'Derecho Fiscal', title: 'Liquidación de IVA y Sociedades para Empresas', desc: 'Gestión fiscal trimestral y anual para pymes, startups y autónomos societarios.', time: 'Mensual/Trimestral', fee: 'Cuota mensual' },
  { id: 77, cat: 'fiscal', catName: 'Derecho Fiscal', title: 'Declaración Informativa de Bienes en el Extranjero (720)', desc: 'Asesoramiento tributario seguro sobre cuentas, valores e inmuebles internacionales.', time: '3 - 7 días', fee: 'Desde 200 €' },
  { id: 78, cat: 'fiscal', catName: 'Derecho Fiscal', title: 'Optimización Tributaria de Estructuras Familiares', desc: 'Constitución de sociedades patrimoniales y protocolos de sucesión de empresas.', time: '1 mes', fee: 'Desde 850 €' },

  // H. Responsabilidad Civil, Daños y Seguros (79-86)
  { id: 79, cat: 'civil', catName: 'Responsabilidad Civil', title: 'Indemnizaciones por Accidentes de Tráfico', desc: 'Reclamación del baremo médico a compañías de seguros por lesiones y secuelas.', time: '1 - 4 meses', fee: 'Porcentaje de éxito' },
  { id: 80, cat: 'civil', catName: 'Responsabilidad Civil', title: 'Negligencias Médicas y Hospitalarias', desc: 'Demandas por errores diagnósticos, secuelas quirúrgicas y mala praxis sanitaria.', time: '3 - 8 meses', fee: 'Estudio de viabilidad' },
  { id: 81, cat: 'civil', catName: 'Responsabilidad Civil', title: 'Reclamaciones contra Aseguradoras por Cobertura', desc: 'Acciones judiciales por rehúse indebido de siniestros de vida, hogar o comercio.', time: '1 - 3 meses', fee: 'Desde 350 €' },
  { id: 82, cat: 'civil', catName: 'Responsabilidad Civil', title: 'Daños por Caídas en Vía Pública o Establecimientos', desc: 'Reclamación de responsabilidad patrimonial al Ayuntamiento de Madrid o empresas.', time: '2 - 6 meses', fee: 'Fijo + % de éxito' },
  { id: 83, cat: 'civil', catName: 'Responsabilidad Civil', title: 'Responsabilidad Civil Profesional', desc: 'Demandas contra técnicos, arquitectos o profesionales por negligencia en el servicio.', time: '2 - 6 meses', fee: 'Desde 600 €' },
  { id: 84, cat: 'civil', catName: 'Responsabilidad Civil', title: 'Conflictos de Cobertura en Seguro del Hogar y Comunidad', desc: 'Litigios por daños de agua, incendios y desacuerdos en comunidades de propietarios.', time: '1 - 3 meses', fee: 'Desde 250 €' },
  { id: 85, cat: 'civil', catName: 'Responsabilidad Civil', title: 'Intromisión al Honor, Intimidad y Propia Imagen', desc: 'Demandas por difamación en medios digitales y redes sociales con indemnización.', time: '2 - 6 meses', fee: 'Desde 650 €' },
  { id: 86, cat: 'civil', catName: 'Responsabilidad Civil', title: 'Daños Causados por Productos Defectuosos', desc: 'Acciones civiles contra fabricantes e importadores por averías o daños personales.', time: '2 - 4 meses', fee: 'Desde 450 €' },

  // I. Especialidades, Administrativo, Nuevas Tecnologías y Bancario (87-106)
  { id: 87, cat: 'especialidades', catName: 'Especialidades', title: 'Licencias Urbanísticas y de Apertura en Madrid', desc: 'Tramitación de licencias de obra, cambios de uso a residencial y declaraciones responsables.', time: '1 - 3 meses', fee: 'Desde 450 €' },
  { id: 88, cat: 'especialidades', catName: 'Especialidades', title: 'Sanciones Urbanísticas y Disciplina Municipal', desc: 'Defensa ante expedientes de restitución de la legalidad y multas coercitivas.', time: '1 - 2 meses', fee: 'Desde 400 €' },
  { id: 89, cat: 'especialidades', catName: 'Especialidades', title: 'Expropiaciones Forzosas y Fijación de Justiprecio', desc: 'Recurso ante el Jurado Provincial de Expropiación para obtener valor real del suelo.', time: '3 - 8 meses', fee: 'Desde 700 €' },
  { id: 90, cat: 'especialidades', catName: 'Especialidades', title: 'Recursos de Alzada y Reposición Administrativa', desc: 'Impugnación de actos, resoluciones y multas dictadas por administraciones públicas.', time: '1 mes de plazo', fee: 'Desde 300 €' },
  { id: 91, cat: 'especialidades', catName: 'Especialidades', title: 'Responsabilidad Patrimonial de la Administración', desc: 'Indemnizaciones por daños directos ocasionados por el funcionamiento de servicios públicos.', time: '3 - 6 meses', fee: 'Desde 500 €' },
  { id: 92, cat: 'especialidades', catName: 'Especialidades', title: 'Contratación con el Sector Público y Licitaciones', desc: 'Recursos contractuales especiales y asesoría en pliegos de contratación pública.', time: 'Plazos perentorios', fee: 'Desde 650 €' },
  { id: 93, cat: 'especialidades', catName: 'Especialidades', title: 'Registro de Marcas y Patentes ante la OEPM', desc: 'Protección de signos distintivos, marcas nacionales, europeas y defensa de oposiciones.', time: '3 - 6 meses', fee: 'Desde 250 €' },
  { id: 94, cat: 'especialidades', catName: 'Especialidades', title: 'Protección de Datos (RGPD) y Auditoría Web', desc: 'Adecuación de portales, políticas de privacidad, cookies y contratos de encargo.', time: '1 - 2 semanas', fee: 'Desde 350 €' },
  { id: 95, cat: 'especialidades', catName: 'Especialidades', title: 'Derecho Bancario: Cláusula Suelo y Gastos Hipotecarios', desc: 'Recuperación de importes cobrados de más por notarías, tasaciones y registros.', time: '2 - 5 meses', fee: 'Porcentaje de éxito' },
  { id: 96, cat: 'especialidades', catName: 'Especialidades', title: 'Tarjetas Revolving y Reclamación de Usura', desc: 'Anulación judicial de contratos de crédito abusivos con devolución total de intereses.', time: '2 - 5 meses', fee: 'Porcentaje de éxito' },
  { id: 97, cat: 'especialidades', catName: 'Especialidades', title: 'Legalidad de Criptomonedas y Blockchain en España', desc: 'Cumplimiento normativo MiCA, registro en Banco de España y tributación de criptoactivos.', time: '2 - 4 semanas', fee: 'Desde 600 €' },
  { id: 98, cat: 'especialidades', catName: 'Especialidades', title: 'Derecho Deportivo y Contratos de Atletas', desc: 'Representación legal ante federaciones, contratos de patrocinio y transferencias.', time: 'A medida', fee: 'Presupuesto cerrado' },
  { id: 99, cat: 'especialidades', catName: 'Especialidades', title: 'Derecho del Arte y Patrimonio Histórico', desc: 'Contratación de obras de arte, exportaciones legales y catalogación patrimonial.', time: '1 - 2 meses', fee: 'Desde 500 €' },
  { id: 100, cat: 'especialidades', catName: 'Especialidades', title: 'Recursos Contenciosos ante Audiencia Nacional y TS', desc: 'Dirección letrada procesal en recursos de máxima complejidad administrativa.', time: 'Proceso judicial', fee: 'Desde 1.200 €' },
  { id: 101, cat: 'especialidades', catName: 'Especialidades', title: 'Arbitraje y Resolución Extrajudicial de Conflictos', desc: 'Defensa ante la Corte de Arbitraje de Madrid y tribunales arbitrales mercantiles.', time: '2 - 6 meses', fee: 'Presupuesto cerrado' },
  { id: 102, cat: 'especialidades', catName: 'Especialidades', title: 'Concesiones Administrativas y Dominio Público', desc: 'Solicitud y defensa letrada de concesiones de aguas, puertos y ocupación de suelo.', time: '2 - 6 meses', fee: 'Desde 750 €' },
  { id: 103, cat: 'especialidades', catName: 'Especialidades', title: 'Derecho Medioambiental y Autorizaciones Integradas', desc: 'Defensa ante sanciones medioambientales y asesoría en autorizaciones ambientales.', time: '1 - 3 meses', fee: 'Desde 600 €' },
  { id: 104, cat: 'especialidades', catName: 'Especialidades', title: 'Derecho Farmacéutico y Sanitario', desc: 'Traspasos de oficinas de farmacia, licencias sanitarias y expedientes ante AEMPS.', time: '1 - 3 meses', fee: 'Desde 800 €' },
  { id: 105, cat: 'especialidades', catName: 'Especialidades', title: 'Franquicias y Redes de Comercialización', desc: 'Redacción de contratos marco de franquicia y resolución de controversias entre partes.', time: '2 - 4 semanas', fee: 'Desde 550 €' },
  { id: 106, cat: 'especialidades', catName: 'Especialidades', title: 'Derecho Marítimo y Transporte Terrestre', desc: 'Reclamaciones por averías de carga, siniestros de transporte y contratos de fletamento.', time: '1 - 3 meses', fee: 'Desde 500 €' }
];

/* ==========================================================================
   2. Horario de Despacho (Madrid Europe/Madrid)
   ========================================================================== */
function initOfficeHours() {
  const badge = document.querySelector('.js-office-status');
  if (!badge) return;

  function checkStatus() {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('es-ES', {
      timeZone: 'Europe/Madrid',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    });

    const parts = formatter.formatToParts(now);
    let weekday = '';
    let hour = 0;
    let minute = 0;

    parts.forEach(p => {
      if (p.type === 'weekday') weekday = p.value.toLowerCase();
      if (p.type === 'hour') hour = parseInt(p.value, 10);
      if (p.type === 'minute') minute = parseInt(p.value, 10);
    });

    const isWeekday = ['lun', 'mar', 'mié', 'mie', 'jue', 'vie'].some(d => weekday.startsWith(d));
    const mins = hour * 60 + minute;
    const mOpen = 9 * 60;
    const mClose = 14 * 60;
    const aOpen = 15 * 60;
    const aClose = 18 * 60;

    const isOpen = isWeekday && ((mins >= mOpen && mins < mClose) || (mins >= aOpen && mins < aClose));

    if (isOpen) {
      badge.className = 'office-status-pill js-office-status';
      badge.innerHTML = '<span class="status-dot"></span> Abierto ahora • Despacho Gran Vía 69';
    } else {
      badge.className = 'office-status-pill closed js-office-status';
      badge.innerHTML = '<span class="status-dot"></span> Cerrado ahora • Urgencias 24h vía WhatsApp';
    }
  }

  checkStatus();
  setInterval(checkStatus, 60000);
}

/* ==========================================================================
   3. Sombra en Cabecera al Hacer Scroll
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   4. Menú de Navegación Móvil
   ========================================================================== */
function initMobileNavigation() {
  const toggleBtn = document.querySelector('.mobile-btn');
  const drawer = document.querySelector('.mobile-drawer-layer');
  const overlay = document.querySelector('.mobile-backdrop-overlay');
  const closeBtn = document.querySelector('.drawer-close-btn');
  const navLinks = document.querySelectorAll('.mobile-drawer-layer a');

  if (!toggleBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  navLinks.forEach(link => link.addEventListener('click', closeDrawer));
}

/* ==========================================================================
   5. Catálogo Interactivo de Servicios Principales (Limpio y Acotado)
   ========================================================================== */
function initServicesCatalog() {
  const container = document.getElementById('servicesGrid');
  const searchInput = document.getElementById('serviceSearchInput');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const countDisplay = document.getElementById('servicesCount');

  if (!container) return;

  const isServicesPage = window.location.pathname.includes('servicios.html');
  let currentCategory = 'all';
  let searchTerm = '';
  let showMoreOnHome = false;

  function renderServices() {
    const filtered = SERVICIOS_JURIDICOS.filter(item => {
      const matchesCat = (currentCategory === 'all' || item.cat === currentCategory);
      const textToSearch = `${item.title} ${item.desc} ${item.catName}`.toLowerCase();
      const matchesSearch = textToSearch.includes(searchTerm.toLowerCase().trim());
      return matchesCat && matchesSearch;
    });

    if (countDisplay) {
      if (isServicesPage) {
        countDisplay.textContent = `Mostrando ${filtered.length} de 106 procedimientos legales en España`;
      } else {
        countDisplay.textContent = `Mostrando servicios jurídicos seleccionados (${filtered.length} disponibles)`;
      }
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: #64748b;">
          <p style="font-size: 1.15rem; margin-bottom: 0.5rem; color: #0f172a; font-weight: 700;">No encontramos coincidencias para "${escapeHtml(searchTerm)}".</p>
          <p style="font-size: 0.95rem;">Consúltanos directamente por WhatsApp al <a href="https://wa.me/919582113764" style="color:#c05634; font-weight:700;">+91 9582113764</a> para estudiar tu expediente a medida.</p>
        </div>
      `;
      return;
    }

    // Si estamos en la página de inicio (index.html) y la categoría es 'all' sin búsqueda, acotamos a 8 servicios para que el scroll sea ligero y elegante
    let itemsToRender = filtered;
    const shouldLimit = !isServicesPage && currentCategory === 'all' && !searchTerm && !showMoreOnHome;
    if (shouldLimit) {
      itemsToRender = filtered.slice(0, 8);
    }

    let cardsHtml = itemsToRender.map(item => `
      <div class="service-card-item" onclick="openConsultationModalWithService('${escapeHtml(item.title)}')">
        <div>
          <span class="service-badge">${item.catName}</span>
          <h4 class="service-title" style="margin-bottom:0.6rem;">${item.title}</h4>
          <p class="service-desc">${item.desc}</p>
        </div>
        <div class="service-footer-cta">
          <span>Concertar cita</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </div>
    `).join('');

    if (shouldLimit) {
      cardsHtml += `
        <div style="grid-column: 1 / -1; text-align: center; margin-top: 1rem;">
          <button id="btnLoadMoreHome" class="btn btn-outline btn-sm" style="border-radius: var(--radius-pill); padding: 0.65rem 1.75rem; font-size: 0.88rem;">
            Mostrar más trámites seleccionados (+${filtered.length - 8})
          </button>
        </div>
      `;
    }

    container.innerHTML = cardsHtml;

    const loadMoreBtn = document.getElementById('btnLoadMoreHome');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        showMoreOnHome = true;
        renderServices();
      });
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-cat') || 'all';
      showMoreOnHome = false;
      renderServices();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value;
      showMoreOnHome = false;
      renderServices();
    });
  }

  renderServices();
}

/* ==========================================================================
   6. Calculadora de Honorarios y Tiempos
   ========================================================================== */
function initFeeCalculator() {
  const catSelect = document.getElementById('calcCatSelect');
  const serviceSelect = document.getElementById('calcServiceSelect');
  const timeOutput = document.getElementById('calcTimeOutput');
  const feeOutput = document.getElementById('calcFeeOutput');
  const notesOutput = document.getElementById('calcNotesOutput');
  const bookBtn = document.getElementById('calcBookBtn');

  if (!catSelect || !serviceSelect) return;

  function populateServices(category) {
    serviceSelect.innerHTML = '';
    const filtered = SERVICIOS_JURIDICOS.filter(s => category === 'all' || s.cat === category);

    filtered.forEach(s => {
      const option = document.createElement('option');
      option.value = s.id;
      option.textContent = s.title;
      serviceSelect.appendChild(option);
    });

    updateCalculatorResult();
  }

  function updateCalculatorResult() {
    const selectedId = parseInt(serviceSelect.value, 10);
    const service = SERVICIOS_JURIDICOS.find(s => s.id === selectedId);

    if (service) {
      if (timeOutput) timeOutput.textContent = service.time;
      if (feeOutput) feeOutput.textContent = service.fee;
      if (notesOutput) notesOutput.textContent = service.desc;

      if (bookBtn) {
        bookBtn.onclick = () => openConsultationModalWithService(service.title);
      }
    }
  }

  catSelect.addEventListener('change', (e) => populateServices(e.target.value));
  serviceSelect.addEventListener('change', updateCalculatorResult);

  populateServices(catSelect.value || 'extranjeria');
}

/* ==========================================================================
   7. Preguntas Frecuentes (FAQ Accordion)
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-single');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });

      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   8. Modal de Cita Previa ("Concierta tu Cita")
   ========================================================================== */
function initConsultationModal() {
  const modal = document.getElementById('consultationModal');
  const openBtns = document.querySelectorAll('.js-open-modal');
  const closeBtns = document.querySelectorAll('.js-close-modal');
  const form = document.getElementById('modalConsultationForm');

  if (!modal) return;

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  }));

  closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalName')?.value || 'Cliente';
      const service = document.getElementById('modalService')?.value || 'Consulta General';
      const phone = document.getElementById('modalPhone')?.value || '';

      closeModal();
      alert(`¡Gracias ${name}! Hemos recibido su solicitud para "${service}". Un letrado colegiado de TrueGrid Leaf se pondrá en contacto con usted al ${phone} en menos de 2 horas hábiles.`);
      form.reset();
    });
  }
}

function openConsultationModalWithService(serviceName) {
  const modal = document.getElementById('consultationModal');
  const serviceInput = document.getElementById('modalService');

  if (serviceInput && serviceName) {
    serviceInput.value = serviceName;
  }

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

/* ==========================================================================
   9. Formularios de Contacto
   ========================================================================== */
function initContactForms() {
  const heroForm = document.getElementById('heroQuickForm');
  const contactForm = document.getElementById('contactPageForm');

  function handleForm(form) {
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Solicitud enviada correctamente. Un letrado de TrueGrid Leaf analizará su asunto y le responderá a la mayor brevedad.');
      form.reset();
    });
  }

  handleForm(heroForm);
  handleForm(contactForm);
}

/* ==========================================================================
   10. Efecto Parallax Sutil e Interactivo en el Fondo del Hero (Trending 60fps)
   ========================================================================== */
function initHeroParallax() {
  const hero = document.getElementById('heroSection');
  if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const blob1 = hero.querySelector('.aurora-blob-1');
  const blob2 = hero.querySelector('.aurora-blob-2');
  const blob3 = hero.querySelector('.aurora-blob-3');
  const rings = hero.querySelectorAll('.hero-geo-ring');
  const card = hero.querySelector('.hero-card-box');

  let ticking = false;
  let mouseX = 0;
  let mouseY = 0;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    mouseY = (e.clientY - rect.top) / rect.height - 0.5;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (blob1) blob1.style.transform = `translate3d(${mouseX * 75}px, ${mouseY * 75}px, 0)`;
        if (blob2) blob2.style.transform = `translate3d(${mouseX * -80}px, ${mouseY * -80}px, 0)`;
        if (blob3) blob3.style.transform = `translate3d(${mouseX * 55}px, ${mouseY * -55}px, 0)`;

        rings.forEach((ring, idx) => {
          const depth = (idx + 1) * 25;
          ring.style.transform = `translate3d(${mouseX * depth}px, calc(-50% + ${mouseY * depth}px), 0)`;
        });

        if (card && window.innerWidth > 992) {
          card.style.transform = `perspective(1000px) rotateY(${mouseX * 5}deg) rotateX(${-mouseY * 5}deg) translateY(-4px)`;
        }

        ticking = false;
      });
      ticking = true;
    }
  });

  hero.addEventListener('mouseleave', () => {
    if (blob1) blob1.style.transform = '';
    if (blob2) blob2.style.transform = '';
    if (blob3) blob3.style.transform = '';
    rings.forEach(ring => ring.style.transform = '');
    if (card) card.style.transform = '';
  });
}

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
