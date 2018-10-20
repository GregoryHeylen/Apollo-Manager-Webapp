$(document).ready(function() {
  initialiseren()
  vulInlogschermIn()
  //declaraties globaal
  var wachtwoord = "2222apollo";
  var selectMedewerkers
  var selectProgrammas
  var programmaMedewerkersArray

  //alle events hieronder

  //de Inlog knop laten werken en testen of wachtwoord klopt zo niet dan kan je niet inloggen
  $('#container').on('click', '#logInKnop', function(){
    if (wachtwoord == $('#password').val()) {
      vulStartschermIn()
    }
    else {
      vulInlogschermIn()
      alert('fout wachtwoord probeer opnieuw')
    }
  })

  //de functieknoppen van het startscherm laten werken
  $('#container').on('click', '.startKnop', function(){
    var id = $(this).attr('id')
    if (id == 'evenementKnop') {
      vulEvenementenschermIn()
    } else if (id == 'programmaKnop') {
      vulProgrammaschermIn()
    } else if (id == 'mederwerkerKnop') {
      vulMedewerkersschermIn()
    } else if (id == 'programmaMederwerkerKnop') {
      maakProgrammaSelect()
      maakMedewerkerSelect()
      vulProgrammaMedewerkerschermIn()
    }
  })

  //laat de navigatieknop werken
  $('#container').on('click', '.navigatieKnop', function(){
    var id = $(this).attr('id')
    if (id == 'startScherm') {
      vulStartschermIn()
    }
  })

  //het event voor het verwijderen van een evenement
  $('#container').on('click', '#verwijderEvenement', function(){
    var id = $(this).val()
    verwijderEvenement(id)
    vulEvenementenschermIn()
  })

  //het evenement aanpassen
  $('#container').on('click', '#saveEvenement', function(){
    var id = $(this).val()
    var naam = $('#' + id + ' #naam').val()
    var datum = $('#' + id + ' #datum').val()
    var foto = $('#' + id + ' #foto').val()
    var facebookLink = $('#' + id + ' #facebookLink').val()
    pasEvenementAan(id, naam, datum, foto, facebookLink)
    vulEvenementenschermIn()
  })

  //een evenement toevoegen
  $('#container').on('click', '#voegtoeEvenement', function(){
    var naam = $('#voegtoeDiv #naam').val()
    var datum = $('#voegtoeDiv #datum').val()
    var foto = $('#voegtoeDiv #foto').val()
    var facebookLink = $('#voegtoeDiv #facebookLink').val()
    insertEvenement(naam, datum, foto, facebookLink)
    vulEvenementenschermIn()
  })

  //het verwijderen van een programma
  $('#container').on('click', '#verwijderProgramma', function(){
    var id = $(this).val()
    verwijderProgramma(id)
    vulProgrammaschermIn()
  })

  //een programma aanpassen
  $('#container').on('click', '#saveProgramma', function(){
    var id = $(this).val()
    var naam = $('#' + id + ' #naam').val()
    var dag = $('#' + id + ' #dag').val()
    var foto = $('#' + id + ' #foto').val()
    var beschrijving = $('#' + id + ' #beschrijving').val()
    var start = $('#' + id + ' #start').val()
    var einde = $('#' + id + ' #einde').val()
    pasProgrammaAan(naam, foto, start, einde, beschrijving, dag, id)
    vulProgrammaschermIn()
  })

  //een programma toevoegen
  $('#container').on('click', '#voegtoeProgramma', function(){
    var naam = $('#voegtoeDiv #naam').val()
    var foto = $('#voegtoeDiv #foto').val()
    var beschrijving = $('#voegtoeDiv #beschrijving').val()
    var start = $('#voegtoeDiv #start').val()
    var einde = $('#voegtoeDiv #einde').val()
    var dag = $('#voegtoeDiv #dag').val()
    insertProgramma(naam, foto, start, einde, beschrijving, dag)
    vulProgrammaschermIn()
  })

  //het verwijderen van een medewerker
  $('#container').on('click', '#verwijderMedewerker', function(){
    var id = $(this).val()
    verwijderMedewerker(id)
    vulMedewerkersschermIn()
  })

  //een programma aanpassen
  $('#container').on('click', '#saveMedewerker', function(){
    var id = $(this).val()
    var naam = $('#' + id + ' #naam').val()
    var foto = $('#' + id + ' #foto').val()
    var beschrijving = $('#' + id + ' #beschrijving').val()
    pasMedewerkerAan(naam, foto, beschrijving, id)
    vulMedewerkersschermIn()
  })

  //een medewerker toevoegen
  $('#container').on('click', '#voegtoeMedewerker', function(){
    var naam = $('#voegtoeDiv #naam').val()
    var foto = $('#voegtoeDiv #foto').val()
    var beschrijving = $('#voegtoeDiv #beschrijving').val()
    insertMedewerker(naam, foto, beschrijving)
    vulMedewerkersschermIn()
  })

  //een programma - medewerker link toevoegen
  $('#container').on('click', '#voegtoeProgrammaMedewerker', function(){
    var idMedewerker = $('#voegtoeDiv #medewerkerSelector').val()
    var idProgramma = $('#voegtoeDiv #programmaSelector').val()
    console.log(idMedewerker);
    console.log(idProgramma);
    insertProgrammaMedewerker(idMedewerker, idProgramma)
    vulProgrammaMedewerkerschermIn()
  })

  //het verwijderen van een PRogramma - medewerker link
  $('#container').on('click', '#verwijderProgrammaMedewerker', function(){
    var id = $(this).val()
    verwijderProgrammaMedewerker(id)
    vulProgrammaMedewerkerschermIn()
  })


  //alle events hierboven
  //alle functies hieronder
  function maakTemplate(maakNavigatieKnop, idNavigatieKnop) {
    $('#container').empty()
    $('#container').append('<h3 id="titel" class="col l6 offset-l3 center"></h3>')
    if (maakNavigatieKnop) {
      $('#container').append('<button id="' + idNavigatieKnop + '" class="col l2 offset-l1 btn-large navigatieKnop">Terug</button>')
    }
    $('#container').append('<div class="col l12" id="content"></div>')
  }

  function vulInlogschermIn() {
    maakTemplate(false)
    $('#titel').append('Vul het wachtwoord in')
    $('#content').append('<div class="input-field col l12"><input id="password" type="password" class="validate col l4 offset-l4"></div>')
    $('#content').append('<button id="logInKnop" class="col l4 offset-l4 btn-large">Log In</button>')
  }

  function vulStartschermIn() {
    maakTemplate(false)
    $('#titel').append('Functies')
    $('#content').append('<button id="evenementKnop" class="col l6 offset-l3 btn-large startKnop">Evenementen</button>')
    $('#content').append('<button id="programmaKnop" class="col l6 offset-l3 btn-large startKnop">Programmas</button>')
    $('#content').append('<button id="mederwerkerKnop" class="col l6 offset-l3 btn-large startKnop">Medewerkers</button>')
    $('#content').append('<button id="programmaMederwerkerKnop" class="col l6 offset-l3 btn-large startKnop">Programma / Medewerkers</button>')
  }

  function vulEvenementenschermIn() {
    var url = "http://radioapollo.be/php_apollo/HaalEvenementenOp.php"
    maakTemplate(true, 'startScherm')
    $('#titel').append('Evenementen')
    $('#content').append('<div id="voegtoeDiv" class="col l12"><div class="col l1"><button class="btn col l12" id="voegtoeEvenement"><i class="material-icons center">add</i></button></div><div class="col l10"><input placeholder="naam" id="naam" type="text" class="validate col l3"><input placeholder="datum" id="datum" type="text" class="validate col l2 offset-l1"><input placeholder="facebook link" id="facebookLink" type="text" class="validate col l2 offset-l1"><input placeholder="foto link" id="foto" type="text" class="validate col l2 offset-l1"></div></div>')
    $.post(url, {}, function(lijstEvenementen) {
      $(lijstEvenementen).each(function(i) {
        $('#content').append('<div id="' + lijstEvenementen[i].id + '" class="col l12"><div class="col l1"><button class="btn col l12" id="saveEvenement" value="' + lijstEvenementen[i].id + '"><i class="material-icons center">done</i></button></div><div class="col l10"><input value="' + lijstEvenementen[i].naam + '" id="naam" type="text" class="validate col l3"><input value="' + lijstEvenementen[i].datum + '" id="datum" type="text" class="validate col l2 offset-l1"><input value="' + lijstEvenementen[i].facebookLink + '" id="facebookLink" type="text" class="validate col l2 offset-l1"><input value="' + lijstEvenementen[i].foto + '" id="foto" type="text" class="validate col l2 offset-l1"></div><div class="col l1"><button class="btn col l12" id="verwijderEvenement" value="' + lijstEvenementen[i].id + '"><i class="material-icons center">clear</i></button></div></div>')
      })
    })
  }

  function vulProgrammaschermIn() {
    var url = "http://radioapollo.be/php_apollo/HaalAlleProgrammasOp.php"
    maakTemplate(true, 'startScherm')
    $('#titel').append("Programma's")
    $('#content').append('<div id="voegtoeDiv" class="col l12"><div class="col l1"><button class="btn col l12" id="voegtoeProgramma"><i class="material-icons center">add</i></button></div><div class="col l11"><input placeholder="naam" id="naam" type="text" class="validate col l2"><input placeholder="start" id="start" type="number" class="validate col l1 offset-l1"><input placeholder="einde" id="einde" type="number" class="validate col l1 offset-l1"><input class="validate col l2 offset-l1" placeholder="weekdag" id="dag" type="number"><input placeholder="foto link" id="foto" type="text" class="validate col l2 offset-l1"><input placeholder="beschrijving" id="beschrijving" type="text" class="validate col l12"></div></div>')
    $.post(url, {}, function(lijstProgrammas) {
      $(lijstProgrammas).each(function(i) {
        if (lijstProgrammas[i].start == 0) {
          $('#content').append('<hr class="col l12"><h4 class="ondertitel col l12 center">' + bepaalWeekdag(lijstProgrammas[i].dag) + ' (' + lijstProgrammas[i].dag + ')<h4>')
        }
        $('#content').append('<div id="' + lijstProgrammas[i].id + '" class="col l12"><div class="col l1"><button class="btn col l12" id="saveProgramma" value="' + lijstProgrammas[i].id + '"><i class="material-icons center">done</i></button></div><div class="col l10"><input value="' + lijstProgrammas[i].naam + '" id="naam" type="text" class="validate col l2"><input value="' + lijstProgrammas[i].start + '" id="start" type="number" class="validate col l1 offset-l1"><input value="' + lijstProgrammas[i].einde + '" id="einde" type="number" class="validate col l1 offset-l1"><input value="' + lijstProgrammas[i].dag + '" id="dag" type="hidden"><input value="' + lijstProgrammas[i].foto + '" id="foto" type="text" class="validate col l2 offset-l1"><input value="' + lijstProgrammas[i].beschrijving + '" id="beschrijving" type="text" class="validate col l2 offset-l1"></div><div class="col l1"><button class="btn col l12" id="verwijderProgramma" value="' + lijstProgrammas[i].id + '"><i class="material-icons center">clear</i></button></div></div>')
      })
    })
  }

  function vulMedewerkersschermIn () {
    var url = "http://radioapollo.be/php_apollo/HaalMedewerkersOp.php"
    maakTemplate(true, 'startScherm')
    $('#titel').append('Medewerkers')
    $('#content').append('<div id="voegtoeDiv" class="col l12"><div class="col l1"><button class="btn col l12" id="voegtoeMedewerker"><i class="material-icons center">add</i></button></div><div class="col l10"><input placeholder="naam" id="naam" type="text" class="validate col l2"><input placeholder="foto link" id="foto" type="text" class="validate col l4 offset-l1"><input placeholder="beschrijving" id="beschrijving" type="text" class="validate col l4 offset-l1"></div></div>')
    $.post(url, {}, function(lijstMedewerkers) {
      $(lijstMedewerkers).each(function(i) {
        $('#content').append('<div id="' + lijstMedewerkers[i].id + '" class="col l12"><div class="col l1"><button class="btn col l12" id="saveMedewerker" value="' + lijstMedewerkers[i].id + '"><i class="material-icons center">done</i></button></div><div class="col l10"><input value="' + lijstMedewerkers[i].naam + '" id="naam" type="text" class="validate col l2"><input value="' + lijstMedewerkers[i].foto + '" id="foto" type="text" class="validate col l4 offset-l1"><input value="' + lijstMedewerkers[i].beschrijving + '" id="beschrijving" type="text" class="validate col l4 offset-l1"></div><div class="col l1"><button class="btn col l12" id="verwijderMedewerker" value="' + lijstMedewerkers[i].id + '"><i class="material-icons center">clear</i></button></div></div>')
      })
    })
  }

  function vulProgrammaMedewerkerschermIn () {
    var url = "http://radioapollo.be/php_apollo/joinProgrammaMedewerkers.php"
    maakTemplate(true, 'startScherm')
    $('#titel').append('Programma - Medewerkers')
    $('#content').append('<div id="voegtoeDiv" class="col l12"><div class="col l1"><button class="btn col l12" id="voegtoeProgrammaMedewerker"><i class="material-icons center">add</i></button></div><div class="col l11">' + selectMedewerkers + selectProgrammas + '</div></div>')
    $.post(url, {}, function(lijst) {
      $(lijst).each(function(i) {
        $('#content').append('<div id="' + lijst[i].id + '" class="col l12"><div class="col l1"><button class="btn col l12" id="verwijderProgrammaMedewerker" value="' + lijst[i].id + '"><i class="material-icons center">clear</i></button></div><div class="col l11"><p class="col l3">' + lijst[i].naam + '</p><p class="col l5 offset-l1">' + lijst[i].programmaNaam + '</p><p class="col l1 offset-l1">' + bepaalWeekdag(lijst[i].dag) + '</p></div></div>')
      })
    })
    initialiseren()
  }

  function verwijderEvenement(id) {
    var url = "http://radioapollo.be/php_apollo/verwijderEvenement.php"
    $.post(url, {id: id})
  }

  function verwijderProgramma(id) {
    var url = "http://radioapollo.be/php_apollo/verwijderProgramma.php"
    $.post(url, {id: id})
  }

  function verwijderMedewerker(id) {
    var url = "http://radioapollo.be/php_apollo/verwijderMedewerker.php"
    $.post(url, {id: id})
  }

  function verwijderProgrammaMedewerker(id) {
    var url = "http://radioapollo.be/php_apollo/verwijderProgrammaMedewerker.php"
    $.post(url, {id: id})
  }

  function pasEvenementAan(id, naam, datum, foto, facebookLink) {
    var url = "http://radioapollo.be/php_apollo/pasEvenementAan.php"
    $.post(url, {id: id, naam: naam, foto: foto, facebookLink: facebookLink, datum: datum})
  }

  function pasProgrammaAan(naam, foto, start, einde, beschrijving, dag, id) {
    var url = "http://radioapollo.be/php_apollo/pasProgrammaAan.php"
    $.post(url, {id: id, naam: naam, foto: foto, beschrijving: beschrijving, dag: dag, start: start, einde: einde})
  }

  function pasMedewerkerAan(naam, foto, beschrijving, id) {
    var url = "http://radioapollo.be/php_apollo/pasMedewerkerAan.php"
    $.post(url, {id: id, naam: naam, foto: foto, beschrijving: beschrijving})
  }

  function insertEvenement(naam, datum, foto, facebookLink) {
    var url = "http://radioapollo.be/php_apollo/insertEvenement.php"
    $.post(url, {naam: naam, foto: foto, facebookLink: facebookLink, datum: datum})
  }

  function insertProgramma(naam, foto, start, einde, beschrijving, dag) {
    var url = "http://radioapollo.be/php_apollo/insertProgramma.php"
    $.post(url, {naam: naam, foto: foto, beschrijving: beschrijving, dag: dag, start: start, einde: einde})
  }

  function insertMedewerker(naam, foto, beschrijving) {
    var url = "http://radioapollo.be/php_apollo/insertMedewerker.php"
    $.post(url, {naam: naam, foto: foto, beschrijving: beschrijving})
  }

  function insertProgrammaMedewerker(idMedewerker, idProgramma) {
    var url = "http://radioapollo.be/php_apollo/insertProgrammmaMedewerker.php"
    $.post(url, {idMedewerker, idProgramma})
  }

  function maakMedewerkerSelect() {
    var url = "http://radioapollo.be/php_apollo/HaalMedewerkersOp.php"
    var select
    $.post(url, {}, function(lijst) {
      select = '<div class=" col l5"><select id="medewerkerSelector" class="browser-default"><option value="" disabled selected>-- Kies een Medewerker --</option>'
      $(lijst).each(function(i) {
        select = select + '<option value="' + lijst[i].id + '">' + lijst[i].naam + '</option>'
      })
      select = select + '</select></div>'
      selectMedewerkers = select
    })
  }

  function maakProgrammaSelect() {
    var url = "http://radioapollo.be/php_apollo/HaalAlleProgrammasOp.php"
    var select
    $.post(url, {}, function(lijst) {
      select = '<div class=" col l6 offset-l1"><select id="programmaSelector" class="browser-default"><option value="" disabled selected>-- Kies een Programma --</option>'
      $(lijst).each(function(i) {
        select += '<option value="' + lijst[i].id + '">' + lijst[i].naam + ' - ' + bepaalWeekdag(lijst[i].dag) + '</option>'
      })
      select += '</select></div>'
      selectProgrammas = select
    })
  }

  function bepaalWeekdag(weekdagnummer) {
    var weekdag
    if (weekdagnummer == 0) {
      weekdag = "Zondag"
    } else if (weekdagnummer == 1) {
      weekdag = "Maandag"
    } else if (weekdagnummer == 2) {
      weekdag = "Dinsdag"
    } else if (weekdagnummer == 3) {
      weekdag = "Woensdag"
    } else if (weekdagnummer == 4) {
      weekdag = "Donderdag"
    } else if (weekdagnummer == 5) {
      weekdag = "Vrijdag"
    } else if (weekdagnummer == 6) {
      weekdag = "Zaterdag"
    } else {
      weekdag = "!ERROR!"
    }
    return weekdag
  }

  //vul functies hierboven in
  function initialiseren() {
    //het initialiseren van de app
    $('select').formSelect();
    maakProgrammaSelect();
    maakMedewerkerSelect();
    console.log('Device is klaar voor gebruik!')
  }
})
