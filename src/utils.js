const removeSpecialChars = rawWord => rawWord.replace(/[|?`#&;$%@"<>()+,!'.]/g, "").replace(/[0-9]/g,'')

module.exports = {
    removeSpecialChars
}
