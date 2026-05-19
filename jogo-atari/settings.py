# Configurações da tela
WIDTH = 800
HEIGHT = 600
FPS = 60
TITLE = "Atari Space Shooter"

# Cores (R, G, B)
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
YELLOW = (255, 255, 0)

# Configurações do Jogador
PLAYER_WIDTH = 40
PLAYER_HEIGHT = 40
PLAYER_COLOR = GREEN
PLAYER_SPEED = 8

# Configurações do Tiro (Projétil)
BULLET_WIDTH = 5
BULLET_HEIGHT = 15
BULLET_COLOR = YELLOW
BULLET_SPEED = -10

# Configurações do Asteroide
ASTEROID_MIN_SIZE = 20
ASTEROID_MAX_SIZE = 50
ASTEROID_COLOR = RED
ASTEROID_MIN_SPEED = 2
ASTEROID_MAX_SPEED = 5
INITIAL_SPAWN_RATE = 90 # Fica mais fácil no começo (tenta criar a cada 90 frames)
MIN_SPAWN_RATE = 20 # Limite de quão rápido podem aparecer
