$(document).ready(function () {
  var envelope = $("#envelope");
  var senhaInput = $("#senha");
  var SENHA_CORRETA = "monster";
  var desbloqueado = false;

  function senhaValida() {
    var digitada = (senhaInput.val() || "").trim().toLowerCase();
    return digitada !== "" && digitada === SENHA_CORRETA.toLowerCase();
  }

  function open() {
    if (!senhaValida() && !desbloqueado) {
      return false;
    }
    desbloqueado = true;
    senhaInput.removeClass("error");
    envelope.addClass("open").removeClass("close locked");
    senhaInput.prop("disabled", true).attr("placeholder", "Aberto com amor");
    return true;
  }

  function mostrarErro() {
    senhaInput.removeClass("error shake");
    // Força reflow para a animação rodar novamente se já estava
    void senhaInput[0].offsetWidth;
    senhaInput.addClass("error shake");
    senhaInput.focus();
  }

  function tentarAbrir() {
    if (desbloqueado) {
      return;
    }
    if (!senhaValida()) {
      mostrarErro();
      return;
    }
    open();
  }

  envelope.addClass("locked");

  envelope.on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (desbloqueado) {
      return;
    }
    if (senhaValida()) {
      open();
    } else {
      senhaInput.focus();
    }
  });

  senhaInput.on("input", function () {
    senhaInput.removeClass("error shake");
    if (senhaValida()) {
      open();
    }
  });

  senhaInput.on("keydown", function (e) {
    if (e.which === 13 || e.key === "Enter") {
      e.preventDefault();
      tentarAbrir();
    }
  });
});
