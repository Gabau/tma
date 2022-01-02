require "test_helper"

class Api::TagControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_tag_index_url
    assert_response :success
  end

  test "should get create" do
    get api_tag_create_url
    assert_response :success
  end

  test "should get show" do
    get api_tag_show_url
    assert_response :success
  end

  test "should get destroy" do
    get api_tag_destroy_url
    assert_response :success
  end
end
