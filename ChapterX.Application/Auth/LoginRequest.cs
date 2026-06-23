using MediatR;
using System.ComponentModel.DataAnnotations;

namespace ChapterX.Application.Auth
{
    public record LoginRequest(
        [Required][EmailAddress][MaxLength(200)] string Email,
        [Required][MaxLength(128)] string Password
    ) : IRequest<LoginResponse>;
}
