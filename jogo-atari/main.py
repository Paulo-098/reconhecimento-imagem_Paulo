import pygame
import sys
import random
from settings import *
from sprites import Player, Asteroid

class Game:
    def __init__(self):
        # Inicialização do Pygame e criação da janela
        pygame.init()
        self.screen = pygame.display.set_mode((WIDTH, HEIGHT))
        pygame.display.set_caption(TITLE)
        self.clock = pygame.Clock()
        self.running = True
        self.font_name = pygame.font.match_font('arial')

    def new(self):
        # Inicia um novo jogo e inicializa as variáveis
        self.score = 0
        self.all_sprites = pygame.sprite.Group()
        self.asteroids = pygame.sprite.Group()
        self.bullets = pygame.sprite.Group()
        
        self.player = Player()
        self.all_sprites.add(self.player)
        
        self.spawn_timer = 0
        self.current_spawn_rate = INITIAL_SPAWN_RATE
        self.speed_multiplier = 1.0
        
        self.run()

    def run(self):
        # Game Loop
        self.playing = True
        while self.playing:
            self.clock.tick(FPS)
            self.events()
            self.update()
            self.draw()

    def events(self):
        # Loop de Eventos
        for event in pygame.event.get():
            # Verifica se fechou a janela
            if event.type == pygame.QUIT:
                if self.playing:
                    self.playing = False
                self.running = False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    self.player.shoot(self.all_sprites, self.bullets)

    def update(self):
        # Atualiza a lógica do jogo
        self.all_sprites.update()

        # Lógica de spawn de asteroides
        self.spawn_timer += 1
        if self.spawn_timer >= self.current_spawn_rate:
            self.spawn_timer = 0
            # Adiciona alguma aleatoriedade
            if random.random() > 0.3:
                asteroid = Asteroid(self.speed_multiplier)
                self.all_sprites.add(asteroid)
                self.asteroids.add(asteroid)

        # Checar colisões - Tiro acerta Asteroide
        hits = pygame.sprite.groupcollide(self.asteroids, self.bullets, True, True)
        for hit in hits:
            self.score += 10 # Ganha 10 pontos por asteroide destruído
            
            # Aumentar a dificuldade a cada acerto
            if self.current_spawn_rate > MIN_SPAWN_RATE:
                self.current_spawn_rate -= 0.5 # Aumenta a frequência de spawn
            self.speed_multiplier += 0.02 # Aumenta a velocidade base dos asteroides

        # Checar colisões - Asteroide acerta o Player
        hits = pygame.sprite.spritecollide(self.player, self.asteroids, False)
        if hits:
            self.playing = False # Game Over
            
        # Checar se o Asteroide passou da tela (Game Over)
        for asteroid in self.asteroids:
            if asteroid.rect.top > HEIGHT:
                self.playing = False # Game Over

    def draw(self):
        # Renderização do jogo
        self.screen.fill(BLACK)
        self.all_sprites.draw(self.screen)
        
        # Desenhar a pontuação
        self.draw_text(self.screen, f"Pontos: {self.score}", 18, WIDTH / 2, 10)
        
        # *after* drawing everything, flip the display
        pygame.display.flip()

    def draw_text(self, surf, text, size, x, y):
        font = pygame.font.Font(self.font_name, size)
        text_surface = font.render(text, True, WHITE)
        text_rect = text_surface.get_rect()
        text_rect.midtop = (x, y)
        surf.blit(text_surface, text_rect)

    def show_go_screen(self):
        # Tela de Game Over
        if not self.running:
            return
        self.screen.fill(BLACK)
        self.draw_text(self.screen, "GAME OVER", 64, WIDTH / 2, HEIGHT / 4)
        self.draw_text(self.screen, f"Pontuação Final: {self.score}", 22, WIDTH / 2, HEIGHT / 2)
        self.draw_text(self.screen, "Pressione qualquer tecla para jogar novamente", 18, WIDTH / 2, HEIGHT * 3 / 4)
        pygame.display.flip()
        self.wait_for_key()

    def wait_for_key(self):
        waiting = True
        while waiting:
            self.clock.tick(FPS)
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    waiting = False
                    self.running = False
                if event.type == pygame.KEYUP:
                    waiting = False

if __name__ == '__main__':
    # Cria o objeto do jogo
    g = Game()
    while g.running:
        g.new()
        g.show_go_screen()

    pygame.quit()
    sys.exit()
