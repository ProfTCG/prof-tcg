import { Selector } from 'testcafe';

class EncyclopediaPage {
  constructor() {
    this.pageId = '#encyclopedia';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(1000).expect(this.pageSelector.exists).ok();
  }
}

export const encyclopediaPage = new EncyclopediaPage();
