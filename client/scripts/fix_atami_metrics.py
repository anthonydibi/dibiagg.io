from pathlib import Path

from fontTools.ttLib import TTFont


SOURCE_PATH = Path('public/Atami-Bold.otf')
OUTPUT_PATH = Path('public/Atami-Bold-Metrics-Fixed.otf')

ASCENDER = 961
DESCENDER = -342


def main() -> None:
    font = TTFont(SOURCE_PATH)

    hhea = font['hhea']
    hhea.ascent = ASCENDER
    hhea.descent = DESCENDER
    hhea.lineGap = 0

    os2 = font['OS/2']
    os2.version = max(os2.version, 4)
    os2.sTypoAscender = ASCENDER
    os2.sTypoDescender = DESCENDER
    os2.sTypoLineGap = 0
    os2.usWinAscent = ASCENDER
    os2.usWinDescent = abs(DESCENDER)
    os2.fsSelection |= 1 << 7  # USE_TYPO_METRICS

    font.save(OUTPUT_PATH)


if __name__ == '__main__':
    main()
