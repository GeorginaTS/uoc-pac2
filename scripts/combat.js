        // Initialize combat page if we're on it
        document.addEventListener('DOMContentLoaded', () => {
            if (document.getElementById('combatPage') && window.location.pathname.includes('combat.html')) {
                showCombatPage();
            }
        });

        // COMBAT PAGE
        async function showCombatPage() {
            showPage('combatPage');
            document.getElementById('pageTitle').textContent = 'Pokedex - Combat';
            showError(null);
            showLoading(true);
            
            try {
                combatState.pokemonData = await fetchRandomPokemon(COMBAT_COUNT);
                renderCombatGrid();
                combatState.selectedCards = [];
                showError(null); // Clear any errors after success
            } catch (error) {
                console.error('Error loading combat:', error);
                showError('Error carregant els Pokemon per al combat.');
            } finally {
                showLoading(false);
            }
        }

        function renderCombatGrid() {
            const container = document.getElementById('combatGrid');
            container.innerHTML = '';

            combatState.pokemonData.forEach((pokemon, index) => {
                const data = extractPokemonData(pokemon);
                const card = createFlipCard(data, index);
                container.appendChild(card);
            });
        }

        function createFlipCard(data, index) {
            const card = document.createElement('div');
            card.className = 'flip-card';
            card.dataset.index = index;
            card.dataset.name = data.name;
            card.dataset.attack = data.attack;
            card.dataset.defense = data.defense;
            
            card.innerHTML = `
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        ?
                    </div>
                    <div class="flip-card-back">
                        <img src="${data.image}" alt="${data.name}">
                        <h4>${data.name}</h4>
                        <div class="flip-card-stats">
                            <div class="stat">
                                <div class="stat-label">Atac</div>
                                <div class="stat-value">${data.attack}</div>
                            </div>
                            <div class="stat">
                                <div class="stat-label">Defensa</div>
                                <div class="stat-value">${data.defense}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => handleCardClick(card));
            
            return card;
        }

        function handleCardClick(card) {
            // If combat is over, don't allow more selections
            if (document.getElementById('combatMessage').textContent !== '') {
                return;
            }

            // If already selected, ignore
            if (combatState.selectedCards.includes(card)) {
                return;
            }

            // Flip the card
            card.classList.add('flipped', 'selected');
            combatState.selectedCards.push(card);

            // If two cards selected, start combat
            if (combatState.selectedCards.length === 2) {
                setTimeout(() => {
                    startCombat();
                }, 600);
            }
        }

        function startCombat() {
            const [card1, card2] = combatState.selectedCards;
            
            const attacker = {
                name: card1.dataset.name,
                attack: parseInt(card1.dataset.attack)
            };
            
            const defender = {
                name: card2.dataset.name,
                defense: parseInt(card2.dataset.defense)
            };

            const messageDiv = document.getElementById('combatMessage');
            let message = '';
            let isWinner = false;

            if (attacker.attack > defender.defense) {
                message = `${attacker.name} ataca i guanya a ${defender.name}!`;
                isWinner = true;
            } else {
                message = `${attacker.name} ataca i perd contra ${defender.name}!`;
                isWinner = false;
            }

            messageDiv.textContent = message;
            messageDiv.className = isWinner ? 'combat-message winner' : 'combat-message';
            
            // Flip all cards and highlight selected ones
            const allCards = document.querySelectorAll('.flip-card');
            allCards.forEach(card => {
                // Flip all cards
                card.classList.add('flipped');
                
                // Make selected cards bigger
                if (combatState.selectedCards.includes(card)) {
                    card.classList.add('winner');
                    
                    // Add winner/loser styling
                    if (card === card1) {
                        // First card is the attacker
                        if (isWinner) {
                            card.classList.add('card-winner');
                        } else {
                            card.classList.add('card-loser');
                        }
                    } else if (card === card2) {
                        // Second card is the defender
                        if (isWinner) {
                            card.classList.add('card-loser');
                        } else {
                            card.classList.add('card-winner');
                        }
                    }
                }
            });
            
            // Show reset button
            document.getElementById('resetCombatBtn').classList.remove('hidden');
            
            // Show custom dialog after a short delay
            setTimeout(() => {
                showCustomDialog(message);
            }, 500);
        }

        function showCustomDialog(message) {
            document.getElementById('dialogMessage').textContent = message;
            document.getElementById('customDialog').classList.remove('hidden');
        }

        function closeDialog() {
            document.getElementById('customDialog').classList.add('hidden');
        }

        function closeDialogAndReplay() {
            closeDialog();
            resetCombat();
        }

        function resetCombat() {
            // Reset all cards
            const allCards = document.querySelectorAll('.flip-card');
            allCards.forEach(card => {
                card.classList.remove('flipped', 'selected', 'winner', 'card-winner', 'card-loser');
            });
            
            combatState.selectedCards = [];
            
            // Clear message
            document.getElementById('combatMessage').textContent = '';
            document.getElementById('combatMessage').className = '';
            
            // Hide reset button
            document.getElementById('resetCombatBtn').classList.add('hidden');
        }