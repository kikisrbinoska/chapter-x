namespace ChapterX.Application.Auth
{
    public interface IJwtTokenService
    {
        string GenerateToken(ChapterX.Domain.Entities.User user);
    }
}
