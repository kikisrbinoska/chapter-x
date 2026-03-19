using MediatR;

namespace ChapterX.Application.Genre.Commands
{
    public record DeleteRequest(int Id) : IRequest<DeleteResponse>;
}
