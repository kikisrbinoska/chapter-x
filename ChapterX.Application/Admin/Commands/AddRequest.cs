using MediatR;

namespace ChapterX.Application.Admin.Commands
{
    public record AddRequest(int UserId) : IRequest<AddResponse>;
}
