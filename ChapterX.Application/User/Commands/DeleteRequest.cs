using MediatR;

namespace ChapterX.Application.User.Commands
{
    public record DeleteRequest(int Id) : IRequest<DeleteResponse>;
}
