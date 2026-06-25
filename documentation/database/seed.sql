INSERT INTO categories (name, description) VALUES
('Tecnologia', 'Notebooks, celulares y accesorios'),
('Hogar', 'Muebles, decoracion y cocina'),
('Deportes', 'Bicicletas, ropa y equipamiento'),
('Servicios', 'Clases, reparaciones y oficios');

INSERT INTO users (full_name, email, phone, password_hash, avatar_url) VALUES
('Usuario Demo', 'demo@mercadovecino.cl', '+56 9 1111 2222', '$2a$10$zWjElpDWY/DO9eEs89Mm6ORoiJIHQ21o5ecy5gLllFDBL2r0jrbum', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'),
('Camila Rojas', 'camila@mail.com', '+56 9 1234 5678', '$2a$10$zWjElpDWY/DO9eEs89Mm6ORoiJIHQ21o5ecy5gLllFDBL2r0jrbum', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'),
('Matias Perez', 'matias@mail.com', '+56 9 8765 4321', '$2a$10$zWjElpDWY/DO9eEs89Mm6ORoiJIHQ21o5ecy5gLllFDBL2r0jrbum', 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80');

INSERT INTO posts (user_id, category_id, title, description, price, condition, commune, status) VALUES
(1, 3, 'Bicicleta urbana aro 29', 'Bicicleta en excelente estado, marco liviano, frenos revisados y cambios ajustados para uso diario.', 180000, 'Usado - excelente', 'Providencia', 'active'),
(1, 1, 'Notebook Lenovo 14 pulgadas', 'Equipo ideal para estudio y trabajo remoto. Incluye cargador original, webcam y bateria funcional.', 320000, 'Usado - bueno', 'Santiago', 'active'),
(1, 2, 'Silla ergonomica con soporte lumbar', 'Silla comoda para escritorio, altura regulable, apoyabrazos y respaldo con soporte lumbar.', 45000, 'Usado - excelente', 'Nunoa', 'active');

INSERT INTO post_images (post_id, image_url, alt_text, is_cover) VALUES
(1, 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&q=80', 'Bicicleta urbana aro 29', TRUE),
(1, 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=600&q=80', 'Detalle fotografico de bicicleta urbana', FALSE),
(2, 'https://images.unsplash.com/photo-1496181130204-755241524eab?auto=format&fit=crop&w=600&q=80', 'Notebook Lenovo de 14 pulgadas', TRUE),
(2, 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=600&q=80', 'Detalle fotografico del notebook', FALSE),
(3, 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=600&q=80', 'Silla ergonomica con soporte lumbar', TRUE),
(3, 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=600&q=80', 'Detalle fotografico de silla ergonomica', FALSE);

INSERT INTO favorites (user_id, post_id) VALUES
(2, 1),
(3, 2);

INSERT INTO messages (post_id, sender_id, receiver_id, body) VALUES
(1, 2, 1, 'Hola, sigue disponible la bicicleta?'),
(2, 3, 1, 'Hola, aceptas transferencia?');

