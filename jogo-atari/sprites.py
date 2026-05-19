import pygame
import random
from settings import *

class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((PLAYER_WIDTH, PLAYER_HEIGHT))
        self.image.fill(PLAYER_COLOR)
        self.rect = self.image.get_rect()
        self.rect.centerx = WIDTH // 2
        self.rect.bottom = HEIGHT - 20
        self.speedx = 0

    def update(self):
        self.speedx = 0
        keystate = pygame.key.get_pressed()
        if keystate[pygame.K_LEFT]:
            self.speedx = -PLAYER_SPEED
        if keystate[pygame.K_RIGHT]:
            self.speedx = PLAYER_SPEED

        self.rect.x += self.speedx

        # Limitar a movimentação à tela
        if self.rect.right > WIDTH:
            self.rect.right = WIDTH
        if self.rect.left < 0:
            self.rect.left = 0

    def shoot(self, all_sprites, bullets):
        bullet = Bullet(self.rect.centerx, self.rect.top)
        all_sprites.add(bullet)
        bullets.add(bullet)

class Bullet(pygame.sprite.Sprite):
    def __init__(self, x, y):
        super().__init__()
        self.image = pygame.Surface((BULLET_WIDTH, BULLET_HEIGHT))
        self.image.fill(BULLET_COLOR)
        self.rect = self.image.get_rect()
        self.rect.bottom = y
        self.rect.centerx = x
        self.speedy = BULLET_SPEED

    def update(self):
        self.rect.y += self.speedy
        # Matar o tiro se ele passar do topo da tela
        if self.rect.bottom < 0:
            self.kill()

class Asteroid(pygame.sprite.Sprite):
    def __init__(self, speed_multiplier=1.0):
        super().__init__()
        size = random.randint(ASTEROID_MIN_SIZE, ASTEROID_MAX_SIZE)
        self.image = pygame.Surface((size, size))
        self.image.fill(ASTEROID_COLOR)
        self.rect = self.image.get_rect()
        self.rect.x = random.randint(0, WIDTH - self.rect.width)
        self.rect.y = random.randint(-100, -40)
        self.speedy = int(random.randint(ASTEROID_MIN_SPEED, ASTEROID_MAX_SPEED) * speed_multiplier)

    def update(self):
        self.rect.y += self.speedy
