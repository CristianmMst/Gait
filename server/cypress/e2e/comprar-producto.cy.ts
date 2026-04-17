/// <reference types="cypress" />

describe('Flujo E2E: Realizar una compra completa', () => {


  beforeEach(() => {
    cy.viewport(1280, 720);
  });
  
  it('Debe completar el flujo desde el login hasta el pago', () => {
    // 1. Visitar la App
    cy.visit('http://localhost:3000'); 

    // 2. LOGIN 
   
    cy.get('input').filter('[type="email"], [name*="email"], [placeholder*="Correo"]')
      .first()
      .should('be.visible')
      .type('test@gait.com', { force: true });

    // input de contraseña
    cy.get('input[type="password"]')
      .should('be.visible')
      .type('123456', { force: true });
    
    
    cy.contains('button', /Iniciar sesión|Ingresar/i).click();
    
    // 3. SELECCIÓN DE PRODUCTO
    cy.url({ timeout: 10000 }).should('not.include', 'login');
    

    cy.get('button').contains(/Añadir|Agregar|Comprar/i).first().click();

    // 4. CARRITO

    cy.get('a[href*="cart"], button[class*="cart"], .cart-icon').first().click();
    
    // Confirmar orden
    cy.contains('button', /Confirmar|Continuar|Comprar/i).click();

    // 5. PAGO
    cy.contains('button', /Pagar|Finalizar/i).click();

    // VERIFICACIÓN FINAL
    cy.contains(/¡Compra exitosa!|Éxito|Gracias/i, { timeout: 10000 }).should('be.visible');
  });
});