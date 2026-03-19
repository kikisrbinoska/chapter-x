namespace ChapterX.Application.Auth
{
    public record LoginResponse(string Token, int UserId, string Username, string Email);
}
