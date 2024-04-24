import { Selector } from 'testcafe';

class EncyclopediaPage {
  constructor() {
    this.pageId = '#encylopedia';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const encyclopediaPage = new EncyclopediaPage();
