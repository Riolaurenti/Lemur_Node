function get_tensions(chord) {
  if (chord == 'maj') {
    return ['9', '11', '13'];
  } else if (chord == 'maj7') {
    return ['9', '13'];
  } else if (chord == 'maj9') {
    return ['9', '13'];
  } else if (chord == 'maj11') {
    return ['9', '11', '13'];
  } else if (chord == 'maj13') {
    return ['9', '13'];
  } else if (chord == 'min') {
    return ['b9', '9', '#11', 'b13'];
  } else if (chord == 'min7') {
    return ['b9', '9', '11', 'b13'];
  } else if (chord == 'min9') {
    return ['b9', '9', '#11', 'b13'];
  } else if (chord == 'min11') {
    return ['b9', '9', '11', 'b13'];
  } else if (chord == 'min13') {
    return ['b9', '9', '#11', '13'];
  } else if (chord == '7') {
    return ['b9', '9', '#9', '11', '#11', 'b13'];
  } else if (chord == '7sus4') {
    return ['b9', '9', '#9', '11', '#11', 'b13'];
  } else if (chord == '7b5') {
    return ['b9', '9', '11', '#11', 'b13'];
  } else if (chord == '7#5') {
    return ['b9', '9', '#9', '11', 'b13'];
  } else if (chord == '7b9') {
    return ['b9', 'bb9', '9', '#9', '11', 'b13'];
  } else if (chord == '7#9') {
    return ['b9', '9', '#9', '11', 'b13'];
  } else if (chord == '7b5b9') {
    return ['bb9', 'b9', '11', '#11', 'b13'];
  } else if (chord == '7b5#9') {
    return ['b9', '#9', '11', '#11', 'b13'];
  } else if (chord == '7#5b9') {
    return ['b9', '#9', '11', 'b13'];
  } else if (chord == '7#5#9') {
    return ['b9', '9', '#9', '11', '#11', 'b13'];
  } else if (chord == '9') {
    return ['b9', '9', '#9', '11', '#11', 'b13'];
  } else if (chord == '9sus4') {
    return ['b9', '9', '#9', '11', '#11', 'b13'];
  } else if (chord == '9b5') {
    return ['b9', '9', '11', '#11', 'b13'];
  } else if (chord == '9#5') {
    return ['b9', '9', '#9', '11', 'b13'];
} else if (chord == '13#11') {
return ['9', '#11', '13'];
} else if (chord == '13b9') {
return ['b9', '9', '3', '11', 'b13'];
} else if (chord == '13#9') {
return ['b9', '#9', '9', '3', '11', 'b13'];
} else if (chord == '7b5') {
return ['b9', '3', 'b13'];
} else if (chord == 'min7b5') {
return ['b9', 'b13'];
} else if (chord == 'sus2') {
return ['9'];
} else if (chord == 'sus4') {
return ['11'];
} else if (chord == 'sus2/4') {
return ['9', '11'];
} else if (chord == 'dim') {
return ['b9', 'bb7'];
} else if (chord == 'dim7') {
return ['b9', 'bb7', '6'];
} else if (chord == 'aug') {
return ['#9', '3', '13'];
} else if (chord == 'aug7') {
return ['#9', '3', 'b13'];
} else if (chord == 'add9') {
return ['9'];
} else if (chord == 'add11') {
return ['11'];
} else if (chord == 'add13') {
return ['13'];
} else {
return [];
}
}
module.exports = {
  get_tensions,
};
