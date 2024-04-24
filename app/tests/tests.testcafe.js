import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { yourcardsPage } from './yourcards.page';
import { addcardsPage } from './addcards.page';
import { navBar } from './navbar.component';
import { marketplacePage } from './marketplace.page';
import { encyclopediaPage } from './encyclopedia.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'testAdmin', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});
test('Test that landing page shows up', async (testController) => {

  await landingPage.isDisplayed(testController);
});
test('Test that "your cards" page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoYourCardsPage(testController);
  await yourcardsPage.isDisplayed(testController);
});
test('Test that addcards page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoAddCardsPage(testController);
  await addcardsPage.isDisplayed(testController);
});
test('Test that marketplace page shows up', async (testController) => {

  await navBar.gotoMarketplacePage(testController);
  await marketplacePage.isDisplayed(testController);
});
test('Test that encyclopedia page shows up', async (testController) => {

  await navBar.gotoEncyclopediaPage(testController);

  await encyclopediaPage.isDisplayed(testController);
});
